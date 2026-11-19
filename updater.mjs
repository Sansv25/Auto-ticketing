import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_OWNER = 'Sansv25';
const REPO_NAME = 'Auto-ticketing';
const BRANCH = 'main';

const FILES_TO_UPDATE = [
  'runner.mjs',
  'package.json',
  'PETUNJUK_PENGGUNAAN.txt',
  'README.md',
  'updater.mjs',
  '1_LOGIN_INSTAGRAM.bat',
];

export async function checkForUpdates(silent = false) {
  const versionFile = path.resolve(__dirname, '.version');
  let currentSha = '';
  if (fs.existsSync(versionFile)) {
    try {
      currentSha = fs.readFileSync(versionFile, 'utf-8').trim();
    } catch {}
  }

  // 1. Cek apakah folder ini adalah git repository dan perintah git tersedia
  const isGitRepo = fs.existsSync(path.resolve(__dirname, '.git'));
  if (isGitRepo) {
    try {
      execSync('git --version', { stdio: 'ignore' });
      if (!silent) console.log('[UPDATE] Memeriksa pembaruan via Git...');

      const remoteOutput = execSync(`git ls-remote origin refs/heads/${BRANCH}`, { encoding: 'utf-8' });
      const remoteSha = remoteOutput.split(/\s+/)[0]?.trim();
      const localSha = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();

      if (remoteSha && remoteSha !== localSha) {
        console.log(`[UPDATE] 🚀 Versi baru terdeteksi (${remoteSha.slice(0, 7)})! Mengunduh update via git pull...`);
        execSync(`git pull origin ${BRANCH} --quiet`, { stdio: 'inherit' });
        fs.writeFileSync(versionFile, remoteSha, 'utf-8');
        console.log('[UPDATE] ✓ Berhasil diperbarui ke versi terbaru!');
        return { updated: true, newSha: remoteSha };
      } else {
        if (!silent) console.log(`[UPDATE] ✓ Bot sudah versi terbaru (${(localSha || remoteSha || '').slice(0, 7)}).`);
        if (localSha && !currentSha) fs.writeFileSync(versionFile, localSha, 'utf-8');
        return { updated: false };
      }
    } catch (e) {
      if (!silent) console.log('[UPDATE] Git tidak merespon, beralih ke pengecekan GitHub API...');
    }
  }

  // 2. Mode HTTP Raw / ZIP (Tanpa Git)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits/${BRANCH}`, {
      headers: {
        'User-Agent': 'BOT_PIKET_ICONNET_UPDATER',
        'Accept': 'application/vnd.github.v3+json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      if (!silent) console.log(`[UPDATE] Cek update dilewati (Status GitHub: ${res.status}). Melanjutkan bot...`);
      return { updated: false };
    }

    const data = await res.json();
    const latestSha = data.sha?.trim();
    const commitMsg = data.commit?.message?.split('\n')[0] || '';

    if (latestSha && latestSha !== currentSha) {
      console.log(`\n[UPDATE] 🚀 Ditemukan pembaruan baru dari GitHub!`);
      console.log(`[UPDATE] Catatan: "${commitMsg}" (${latestSha.slice(0, 7)})`);
      console.log('[UPDATE] Mengunduh file terbaru...');

      let pkgChanged = false;

      for (const relPath of FILES_TO_UPDATE) {
        try {
          const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${relPath}`;
          const fileRes = await fetch(rawUrl);
          if (fileRes.ok) {
            const content = await fileRes.text();
            const localPath = path.resolve(__dirname, relPath);
            fs.writeFileSync(localPath, content, 'utf-8');
            if (relPath === 'package.json') pkgChanged = true;
          }
        } catch (fileErr) {
          console.warn(`[UPDATE] ⚠️ Gagal mengunduh ${relPath}:`, fileErr.message);
        }
      }

      fs.writeFileSync(versionFile, latestSha, 'utf-8');
      console.log(`[UPDATE] ✓ Bot berhasil diperbarui ke versi ${latestSha.slice(0, 7)}!\n`);

      if (pkgChanged) {
        try {
          console.log('[UPDATE] Memeriksa dependensi baru (npm install)...');
          execSync('npm install --omit=dev', { stdio: 'inherit' });
        } catch {}
      }

      return { updated: true, newSha: latestSha };
    } else {
      if (!silent) console.log(`[UPDATE] ✓ Bot sudah versi terbaru (${(currentSha || latestSha || 'v1').slice(0, 7)}).`);
      if (latestSha && !currentSha) fs.writeFileSync(versionFile, latestSha, 'utf-8');
      return { updated: false };
    }
  } catch (err) {
    if (!silent) console.log('[UPDATE] Lewati cek update (offline/timeout). Melanjutkan bot...');
    return { updated: false };
  }
}

// Eksekusi langsung jika dipanggil via `node updater.mjs`
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  checkForUpdates(false).then(() => {
    process.exit(0);
  });
}
