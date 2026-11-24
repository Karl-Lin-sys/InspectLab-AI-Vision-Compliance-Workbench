export type NistFunctionCode = 'GV' | 'ID' | 'PR' | 'DE' | 'RS' | 'RC';

export interface NistControlItem {
  id: string;
  fnCode: NistFunctionCode;
  fnName: string;
  controlId: string;
  title: string;
  implementationInCode: string;
  toddlerCanadianSummary: string;
}

export const NIST_CSF_CONTROLS: NistControlItem[] = [
  {
    id: 'nist-gv-1',
    fnCode: 'GV',
    fnName: 'Govern',
    controlId: 'GV.OC-03',
    title: 'Cross-Border Legal & AI Risk Accountability',
    implementationInCode: 'Maintain Model Card, OSS license inventory (Apache-2.0), and employer trade-secret clearance before any GitHub push.',
    toddlerCanadianSummary: 'Ask a grown-up first and check the sharing rules in all four countries before putting anything in the public toy box.',
  },
  {
    id: 'nist-id-1',
    fnCode: 'ID',
    fnName: 'Identify',
    controlId: 'ID.AM-02',
    title: 'AI Model, Dataset & Dependency SBOM Inventory',
    implementationInCode: 'Pin PyTorch, TensorFlow, and OpenCV hashes in requirements.txt; record training lot lineage without PII.',
    toddlerCanadianSummary: 'Write a neat list of every single Lego brick and crayon inside our kit so nothing sneaks in by surprise.',
  },
  {
    id: 'nist-pr-1',
    fnCode: 'PR',
    fnName: 'Protect',
    controlId: 'PR.DS-01',
    title: 'Input Magic-Byte Guard, Decompression Cap & EXIF Scrubbing',
    implementationInCode: 'validate_and_decode_image() verifies JPEG/PNG magic bytes, enforces MAX_PIXELS, and strips EXIF/GPS via cv2.imdecode.',
    toddlerCanadianSummary: 'Check every photo at the door, wipe off any home address stickers, and block giant photos that might clog the sink.',
  },
  {
    id: 'nist-pr-2',
    fnCode: 'PR',
    fnName: 'Protect',
    controlId: 'PR.PS-01',
    title: 'Safe Weight Deserialization (Prevent Pickle RCE)',
    implementationInCode: 'verify_and_load_weights() checks SHA-256 digest and strictly passes weights_only=True to torch.load().',
    toddlerCanadianSummary: 'Check the secret lock stamp on the helper brain file so nobody can hide a sneaky trick inside it.',
  },
  {
    id: 'nist-de-1',
    fnCode: 'DE',
    fnName: 'Detect',
    controlId: 'DE.CM-09',
    title: 'Data Drift, Worst-Lot Recall & Latency Telemetry',
    implementationInCode: 'Log anonymized batch inference latency, confidence entropy, and Population Stability Index (PSI) without storing raw worker faces.',
    toddlerCanadianSummary: 'Keep a friendly watch-eye on our helper so we notice right away if the room lighting changes and it gets confused.',
  },
  {
    id: 'nist-rs-1',
    fnCode: 'RS',
    fnName: 'Respond',
    controlId: 'RS.MI-01',
    title: 'Quarantine Malformed Batches & Roll Back Model Weights',
    implementationInCode: 'Reject corrupted payloads with HTTP 422, isolate anomalous lots, and trigger SECURITY.md disclosure workflow.',
    toddlerCanadianSummary: 'If a grumpy broken file tries to sneak in, put it in a safe timeout basket right away and tell the team.',
  },
  {
    id: 'nist-rc-1',
    fnCode: 'RC',
    fnName: 'Recover',
    controlId: 'RC.RP-03',
    title: 'Immutable Checkpoint & Determinism Recovery',
    implementationInCode: 'Restore verified SHA-256 ONNX/SavedModel artifacts with pinned random seeds and reproducible Docker digests.',
    toddlerCanadianSummary: 'Always keep a clean backup copy locked in a safe cupboard so we can start fresh in two shakes if anything spills.',
  },
];

export type JurisdictionId = 'tw' | 'ca' | 'de' | 'jp';

export interface JurisdictionSpec {
  id: JurisdictionId;
  country: string;
  primaryStatutes: string[];
  dataAndPrivacyRule: string;
  ipAndCopyrightRule: string;
  aiAndSecurityRule: string;
  mandatoryGithubChecklist: string[];
  toddlerCanadianSummary: string;
}

export const JURISDICTIONS: Record<JurisdictionId, JurisdictionSpec> = {
  tw: {
    id: 'tw',
    country: 'Taiwan (台灣)',
    primaryStatutes: [
      'Personal Data Protection Act (PDPA)',
      'Trade Secrets Act',
      'Copyright Act',
    ],
    dataAndPrivacyRule:
      'Never upload factory floor photos containing recognizable workers, employee IDs, or unconsented personal data (PDPA Art. 19–21). Strip all EXIF/GPS tags before committing test samples.',
    ipAndCopyrightRule:
      'Under Taiwan Copyright Act Art. 11–12, code written within employment scope at Ezekiel Automation belongs to the employer unless agreed otherwise. Never upload proprietary company code or labelled datasets without written authorization.',
    aiAndSecurityRule:
      'Trade Secrets Act Art. 2 & 13 strictly penalize unauthorized external disclosure of confidential inspection algorithms, CAD tolerances, or customer PCB photos.',
    mandatoryGithubChecklist: [
      'Written employer clearance if any part was developed during employment',
      'Zero customer PCB/factory images or CAD tolerances in git history',
      'Explicit Apache-2.0 / MIT LICENSE & Taiwan PDPA zero-PII notice',
    ],
    toddlerCanadianSummary:
      'In Taiwan, we make sure not to share any secret work drawings from the company or any photos of real people without asking permission first.',
  },
  ca: {
    id: 'ca',
    country: 'Canada',
    primaryStatutes: [
      'PIPEDA (Personal Information Protection and Electronic Documents Act)',
      'Copyright Act (R.S.C., 1985, c. C-42)',
      'Provincial Privacy Acts (e.g., Quebec Law 25, AB/BC PIPA)',
    ],
    dataAndPrivacyRule:
      'PIPEDA Principle 4.3 & 4.7 require meaningful consent, strict purpose limitation, and technical safeguards for any identifiable information—synthetic or public benchmark metadata only in public repos.',
    ipAndCopyrightRule:
      'Address Canadian Copyright Act moral rights explicitly via clean authorship attribution and compatible open-source licensing (Apache-2.0 includes explicit patent grant & attribution preservation).',
    aiAndSecurityRule:
      'Use NIST CSF 2.0 / Canadian Centre for Cyber Security baseline safeguards (no hardcoded credentials, vulnerability reporting via SECURITY.md).',
    mandatoryGithubChecklist: [
      'No personal data or identifiable telemetry in sample JSON/images',
      'Clear copyright notice & moral-rights/attribution respecting Apache-2.0 LICENSE',
      'SECURITY.md vulnerability disclosure contact included',
    ],
    toddlerCanadianSummary:
      'Here in Canada, we follow the Golden Rule of sharing: keep personal names and faces private, put your name politely on your own work, and include a helpful safety note.',
  },
  de: {
    id: 'de',
    country: 'Germany (Deutschland / EU)',
    primaryStatutes: [
      'GDPR / DSGVO (General Data Protection Regulation) & BDSG',
      'EU Artificial Intelligence Act (Regulation (EU) 2024/1689)',
      'UrhG (Urheberrechtsgesetz) & Digital Services Act / DDG',
    ],
    dataAndPrivacyRule:
      'DSGVO Art. 5 (Data Minimization), Art. 25 (Privacy by Design), and Art. 44–49 (Third-Country Transfers): GitHub servers are US-hosted, so ZERO personal data (worker faces, badges, IP logs) may ever enter a public repository.',
    ipAndCopyrightRule:
      'Under German UrhG (§ 31, § 69b), verify employee software rights and attach exact OSS license headers + NOTICE file for all third-party libraries (PyTorch BSD-3, OpenCV Apache-2.0).',
    aiAndSecurityRule:
      'EU AI Act prohibits workplace emotion/biometric tracking and requires technical documentation, robustness, and human-oversight transparency for industrial safety components.',
    mandatoryGithubChecklist: [
      'Zero personal data (GDPR Art. 4/44) — synthetic sample tensors only',
      'Complete NOTICE file listing PyTorch/TF/OpenCV upstream licenses (UrhG)',
      'Human-oversight & industrial-only non-biometric scope stated in README',
    ],
    toddlerCanadianSummary:
      'In Germany, the rules are extra careful about privacy! We never put any people photos on the internet, we thank everyone whose blocks we borrowed, and we promise never to spy on workers.',
  },
  jp: {
    id: 'jp',
    country: 'Japan (日本)',
    primaryStatutes: [
      'APPI (個人情報保護法 — Act on the Protection of Personal Information)',
      'Copyright Act Art. 30-4 (著作権法 第30条の4)',
      'Unfair Competition Prevention Act (不正競争防止法)',
    ],
    dataAndPrivacyRule:
      'APPI Art. 28 strictly regulates cross-border transfers of personal data. Public GitHub repos must exclude personal data or comply with anonymized/non-personal synthetic data standards.',
    ipAndCopyrightRule:
      'Japan Copyright Act Art. 30-4 permits non-enjoyment ML analysis/training, EXCEPT where it "unreasonably prejudices the interests of the copyright owner" (proviso) — do not redistribute raw copyrighted datasets on GitHub.',
    aiAndSecurityRule:
      'Unfair Competition Prevention Act Art. 2(1)(iv)–(x) protects trade secrets and shared data with access controls; never commit model weights trained on restricted proprietary data.',
    mandatoryGithubChecklist: [
      'Do not redistribute third-party copyrighted image datasets in the repo',
      'Zero personal data subject to APPI Art. 28 cross-border transfer rules',
      'Only clean code + reproducible synthetic test generator committed',
    ],
    toddlerCanadianSummary:
      'In Japan, we are careful never to copy someone else’s picture book without permission, and we only put our own clean code—not private photos or company secrets—into GitHub.',
  },
};

export interface RepoBundleFile {
  filename: string;
  description: string;
  content: string;
}

export function generateGitHubBundleFiles(projectName = 'ezekiel-vision-inspect-ref'): RepoBundleFile[] {
  return [
    {
      filename: 'LICENSE',
      description: 'Apache-2.0 License (explicit patent grant & attribution compatible across TW, CA, DE, JP)',
      content: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

Copyright 2026 [Author / Rights Holder Name]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`,
    },
    {
      filename: 'SECURITY.md',
      description: 'NIST CSF 2.0 Vulnerability Disclosure & Safe Deserialization Policy',
      content: `# Security Policy (NIST CSF 2.0 Aligned)

## Supported Versions
Only the latest tagged release with pinned SHA-256 dependency hashes is supported.

## Core Security Controls Implemented
- **PR.DS-01 (Input Sanitization)**: Magic-byte verification, max pixel cap (\`4096x4096\`), and automatic EXIF/GPS stripping via \`cv2.imdecode\`.
- **PR.PS-01 (Safe Weight Loading)**: Strict SHA-256 verification + \`torch.load(..., weights_only=True)\` to prevent pickle arbitrary code execution.
- **GV.OC-03 (No Secrets)**: Zero API keys, tokens, or internal plant endpoints in git history.

## Reporting a Vulnerability
Please report security issues privately to \`security@example.invalid\` before opening a public issue.`,
    },
    {
      filename: 'PRIVACY_AND_CROSSBORDER.md',
      description: '4-Jurisdiction Pre-Upload Legal Compliance Declaration (TW / CA / DE / JP)',
      content: `# Cross-Border Privacy, IP & AI Compliance Notice

> **Disclaimer**: This repository template provides engineering compliance controls and is not formal legal counsel. Obtain sign-off from qualified legal counsel and your employer before publishing.

1. **Taiwan (PDPA, Copyright Act, Trade Secrets Act)**:
   - Zero factory/customer images, CAD drawings, or employee personal data are stored in this repository.
   - Only synthetic zero-PII test fixtures are used.
2. **Canada (PIPEDA, Copyright Act)**:
   - Meaningful consent & minimization enforced; clean authorship attribution under Apache-2.0.
3. **Germany / EU (GDPR/DSGVO, UrhG, EU AI Act)**:
   - Privacy-by-design (Art. 25): no biometric worker monitoring; no personal data transferred outside the EEA (Art. 44).
   - Upstream OSS notices preserved in \`NOTICE\`.
4. **Japan (APPI, Copyright Act Art. 30-4, UCPA)**:
   - No redistribution of third-party copyrighted datasets; no APPI Art. 28 cross-border personal data transfers.`,
    },
    {
      filename: '.gitignore',
      description: 'Blocks datasets, model weights, .env secrets, and camera captures from git commits',
      content: `# Secrets & Environment
.env
.env.*
!.env.example

# Proprietary Datasets, Factory Photos & Model Weights (TW/CA/DE/JP Compliance)
*.jpg
*.jpeg
*.png
*.bmp
*.tiff
*.pt
*.pth
*.onnx
*.safetensors
*.h5
datasets/
checkpoints/

# Python caches
__pycache__/
*.py[cod]
.venv/
venv/`,
    },
    {
      filename: 'README.md',
      description: 'Reproducible architecture overview with NIST CSF 2.0 & Toddler-Friendly Canadian English summary',
      content: `# ${projectName}

Clean, leak-free industrial visual inspection reference architecture built on official PyTorch 2.x, TensorFlow 2.x, and OpenCV 4.x documentation and peer-reviewed CVPR / ECCV / NeurIPS / ICLR research.

## Simple Summary (Canadian English)
Imagine sorting good blocks from scratched blocks with a friendly magnifying glass. We keep the magnifying glass clean, never save secret photos of real people, check every file stamp for safety, and share only clean building instructions!

## Pre-Upload Commands
\`\`\`bash
git init -b main
git add LICENSE SECURITY.md PRIVACY_AND_CROSSBORDER.md .gitignore README.md vision_ingest.py pytorch_pipeline.py tf_pipeline.py
git status # Verify ZERO .env, .pt, .onnx, or photo files are staged
git commit -m "chore: initial NIST CSF 2.0 & multi-jurisdiction compliant vision reference"
# Replace with your authenticated GitHub repository URL:
# git remote add origin https://github.com/<your-org>/${projectName}.git
# git push -u origin main
\`\`\``,
    },
  ];
}

export function generateRepoSetupScript(files: RepoBundleFile[]): string {
  const fileBlocks = files
    .map(
      (f) =>
        `cat <<'EOF_${f.filename.replace(/[^A-Za-z0-9]/g, '_').toUpperCase()}' > "${f.filename}"\n${f.content}\nEOF_${f.filename.replace(/[^A-Za-z0-9]/g, '_').toUpperCase()}`
    )
    .join('\n\n');

  return `#!/usr/bin/env bash
set -euo pipefail

mkdir -p ezekiel-vision-inspect-ref
cd ezekiel-vision-inspect-ref

${fileBlocks}

echo "Created compliant GitHub staging directory: $(pwd)"
echo "Next: verify git status contains zero datasets/secrets before git push."
`;
}
