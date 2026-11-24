export type TaskCategory = 'all' | 'detection' | 'anomaly' | 'runtime';
export type JdFocusArea = 'all' | 'training' | 'vision' | 'data' | 'deploy';

export interface PeerReviewedModel {
  id: string;
  name: string;
  venue: string;
  year: number;
  category: Exclude<TaskCategory, 'all'>;
  jdAreas: Exclude<JdFocusArea, 'all'>[];
  githubRepo: string;
  reproNote: string;
  inductiveBias: string;
  leakageAndImbalanceGuard: string;
  benchmarkSummary: string;
  deploymentTarget: string;
  toddlerCanadianExplanation: string;
}

export const PEER_REVIEWED_MODELS: PeerReviewedModel[] = [
  {
    id: 'yolov10',
    name: 'YOLOv10 (Consistent Dual Assignments)',
    venue: 'NeurIPS',
    year: 2024,
    category: 'detection',
    jdAreas: ['vision', 'training', 'deploy'],
    githubRepo: 'THU-MIG/yolov10',
    reproNote: 'Official PyTorch reference & ONNX/TensorRT export pipeline',
    inductiveBias: 'CNN-hybrid spatial pyramid without Non-Maximum Suppression (NMS) post-processing',
    leakageAndImbalanceGuard:
      'Evaluated on COCO AP50:95; for factory lines, requires lot-grouped splits and class-balanced focal/varifocal loss so rare scratches are not drowned out by normal boards.',
    benchmarkSummary: '46% lower latency than YOLOv8-M at comparable mAP; deterministic end-to-end C++/C# ONNX Runtime inference.',
    deploymentTarget: 'Edge IPC / C++ & C# ONNX Runtime',
    toddlerCanadianExplanation:
      'Picture a super-quick helper who spots broken toy blocks in one single glance, without needing to double-check a messy stack of sticky notes afterwards.',
  },
  {
    id: 'yolov9',
    name: 'YOLOv9 (PGI + GELAN)',
    venue: 'ECCV',
    year: 2024,
    category: 'detection',
    jdAreas: ['vision', 'training'],
    githubRepo: 'WongKinYiu/yolov9',
    reproNote: 'Official Academia Sinica (Taiwan) PyTorch implementation',
    inductiveBias: 'Programmable Gradient Information (PGI) prevents deep-layer information bottleneck on tiny defects',
    leakageAndImbalanceGuard:
      'Auxiliary reversible branch preserves fine hairline crack gradients during backprop, reducing overfitting on small defect datasets.',
    benchmarkSummary: 'Strongest small-object recall among pure-CNN real-time detectors; ideal for micro-solder & surface pinholes.',
    deploymentTarget: 'GPU Inspection Server / TensorRT',
    toddlerCanadianExplanation:
      'When you whisper a secret down a long line of friends, the last friend sometimes forgets tiny details. This helper uses a clear notebook so even tiny scratches stay easy to see.',
  },
  {
    id: 'rtdetr',
    name: 'RT-DETR (Real-Time Detection Transformer)',
    venue: 'CVPR',
    year: 2024,
    category: 'detection',
    jdAreas: ['vision', 'training', 'deploy'],
    githubRepo: 'lyuwenyu/RT-DETR',
    reproNote: 'Official PyTorch & PaddleDetection reference with ONNX benchmarks',
    inductiveBias: 'Hybrid CNN backbone + Intra-scale/Cross-scale Transformer encoder with global attention',
    leakageAndImbalanceGuard:
      'Uncertainty-minimal query selection avoids anchor-box hyperparameter tuning bias across varying part sizes.',
    benchmarkSummary: '53.1% AP on COCO at 108 FPS (T4 GPU); excels when defects depend on global layout context (missing pins or misaligned parts).',
    deploymentTarget: 'Cloud or Local GPU API (Python / C++)',
    toddlerCanadianExplanation:
      'Instead of looking at just one corner at a time, this helper steps back to check the whole puzzle board at once, making sure no piece is sitting in the wrong spot.',
  },
  {
    id: 'simplenet',
    name: 'SimpleNet (Feature-Space Anomaly Detection)',
    venue: 'CVPR',
    year: 2023,
    category: 'anomaly',
    jdAreas: ['vision', 'data', 'deploy'],
    githubRepo: 'DonaldRR/SimpleNet',
    reproNote: 'Official PyTorch implementation on MVTec AD & VisA benchmarks',
    inductiveBias: 'Pretrained frozen feature extractor + linear adapter + Gaussian-noise feature discriminator',
    leakageAndImbalanceGuard:
      'Trains ONLY on normal ("OK") samples with synthetic feature perturbations—completely sidesteps 99:1 defect class imbalance and rare-defect label scarcity.',
    benchmarkSummary: '99.6% Image-AUROC on MVTec AD at ~77 FPS; evaluates via Pixel-AUROC and PRO-score rather than raw Accuracy.',
    deploymentTarget: 'Low-Label Factory Line / Local Python + C# UI',
    toddlerCanadianExplanation:
      'If you only show your helper what healthy red apples look like, it can right away point out any bruised or wormy apple—even a weird bruise it has never seen before!',
  },
  {
    id: 'anomalyclip',
    name: 'AnomalyCLIP (Object-Agnostic Prompting)',
    venue: 'ICLR',
    year: 2024,
    category: 'anomaly',
    jdAreas: ['vision', 'training'],
    githubRepo: 'zqhang/AnomalyCLIP',
    reproNote: 'Official PyTorch CLIP-based zero-shot industrial inspection code',
    inductiveBias: 'Vision-Language Transformer with object-agnostic normality/abnormality text prompts',
    leakageAndImbalanceGuard:
      'Evaluated strictly across unseen product categories (zero-shot cross-dataset MVTec -> VisA) to prove zero category data leakage.',
    benchmarkSummary: 'High zero-shot Pixel-AUROC when switching to brand-new factory SKUs before defect photos exist.',
    deploymentTarget: 'New Product Introduction (NPI) / Cloud GPU',
    toddlerCanadianExplanation:
      'This clever helper knows what "clean and smooth" versus "scratched or cracked" means in plain words, so it can check a brand-new toy on its very first day.',
  },
  {
    id: 'pytorch_tf_opencv',
    name: 'PyTorch 2.x + OpenCV + ONNX Runtime Stack',
    venue: 'Official Docs',
    year: 2025,
    category: 'runtime',
    jdAreas: ['data', 'deploy', 'training'],
    githubRepo: 'pytorch/pytorch · opencv/opencv · microsoft/onnxruntime',
    reproNote: 'Official PyTorch 2.x torch.compile, TensorFlow tf.data, and OpenCV C++/Python APIs',
    inductiveBias: 'Train in PyTorch 2.x (or TF 2.x for TFLite/Edge); serve via ONNX Runtime C++/C# for zero-GIL determinism',
    leakageAndImbalanceGuard:
      'Official torch.inference_mode(), tf.data.AUTOTUNE, and strict lot-grouped DataLoader prevent reference-count memory leaks and training-serving skew.',
    benchmarkSummary: 'Matches Ezekiel Automation stack: Python training + OpenCV preprocessing + C++/C# shop-floor HMI & JS web dashboard.',
    deploymentTarget: 'Hybrid Edge C#/C++ + FastAPI Python',
    toddlerCanadianExplanation:
      'Think of Python as the art studio where we teach our helper, OpenCV as the gentle magnifying glass that cleans the photo, and C++ or C# as the sturdy lunchbox we pack for the factory.',
  },
];

export interface RootCauseDiagnostic {
  id: string;
  title: string;
  category: 'Algorithmic Defect' | 'Sampling & Selection Bias' | 'Framework Memory Defect';
  primarySource: string;
  mechanism: string;
  impactOnVisualInspection: string;
  toddlerCanadianSummary: string;
}

export const ROOT_CAUSE_DIAGNOSTICS: RootCauseDiagnostic[] = [
  {
    id: 'selection_shortcut',
    title: 'Selection Bias & Spurious Background Shortcut Learning',
    category: 'Sampling & Selection Bias',
    primarySource: 'Sagawa et al. (ICLR 2020 / GroupDRO) & Geirhos et al. (Nature MI 2020) · Cross-domain OOD benchmarks (2021–2025)',
    mechanism:
      'In factory visual inspection, defective parts often arrive from a specific lighting rig, shift, or camera station (selection bias). Standard Empirical Risk Minimization (ERM) minimizes average loss by memorizing background lighting/conveyor texture instead of the micro-crack itself. Random frame-level train/test splits hide this via temporal data leakage.',
    impactOnVisualInspection:
      'Validation PR-AUC looks >95% in the lab, then collapses to ~50% when moved to a neighbour conveyor line or when daytime sunlight shifts.',
    toddlerCanadianSummary:
      'If every broken cookie happens to sit on a blue plate, a lazy helper learns "blue plate = broken" instead of checking the cookie! When we put a good cookie on a blue plate, it gets tricked.',
  },
  {
    id: 'imbalance_pgi',
    title: 'Majority-Class Gradient Dominance & Deep Feature Bottleneck',
    category: 'Algorithmic Defect',
    primarySource: 'Menon et al. (ICLR 2021 — Logit Adjustment) & Wang et al. (ECCV 2024 — YOLOv9 PGI)',
    mechanism:
      'With 99% normal parts and 1% defects, standard Cross-Entropy gradients are dominated by normal background pixels. Simultaneously, repeated downsampling in deep CNNs discards fine spatial frequencies (Data Processing Inequality), causing tiny 4px solder defects to vanish before the detection head.',
    impactOnVisualInspection:
      'Model predicts "Normal" for almost everything (99.0% Accuracy, <0.45 Defect Recall) and misses hairline scratches.',
    toddlerCanadianSummary:
      'If 99 blocks are good and only 1 block has a tiny scratch, the helper stops paying attention to scratches—and blurry glasses make tiny marks disappear.',
  },
  {
    id: 'framework_leaks',
    title: 'Framework Graph Retracing & Copy-on-Write (COW) Refcount Leaks',
    category: 'Framework Memory Defect',
    primarySource: 'PyTorch Official Issue #13246 (DataLoader Python List COW Leak) & TensorFlow Issue #46537 / Official Retracing Docs',
    mechanism:
      'Storing Python lists/dicts of file paths inside a multi-worker PyTorch Dataset increments Python object refcounts on read in forked workers, dirtying shared OS memory pages (OOM over long runs). In TensorFlow, calling @tf.function with changing Python primitives or dynamic shapes triggers unbounded graph retracing.',
    impactOnVisualInspection:
      'Training or 24/7 factory inspection API gradually consumes all RAM/VRAM and crashes mid-shift.',
    toddlerCanadianSummary:
      'If our helper keeps every single scrap of scratch paper in its backpack instead of tossing old notes into the recycling bin, the backpack gets too heavy and rips!',
  },
];

export interface TheoreticalSolution {
  id: 'logit_pgi' | 'group_dro' | 'memory_bank';
  title: string;
  citation: string;
  mathematicalBasis: string;
  implementationSteps: string[];
  toddlerCanadianTitle: string;
  toddlerCanadianAnalogy: string;
}

export const THREE_SOLUTIONS: TheoreticalSolution[] = [
  {
    id: 'logit_pgi',
    title: 'Solution 1: Bayes-Optimal Logit Adjustment + PGI Reversible Branch',
    citation: 'Menon et al. (ICLR 2021) + Wang et al. (ECCV 2024, YOLOv9)',
    mathematicalBasis:
      'Add class-prior log-odds offset τ·log(π_y) to logits during training/inference so the decision boundary maximizes Balanced Accuracy & Macro-F1 rather than majority-class accuracy, paired with an auxiliary reversible PGI branch to preserve micro-defect mutual information I(X; Z).',
    implementationSteps: [
      'Compute lot-level class priors π_y strictly on the training fold (never on validation/test).',
      'Apply Logit-Adjusted Cross-Entropy: L = -log(exp(f_y(x) + τ·log π_y) / Σ_j exp(f_j(x) + τ·log π_j)).',
      'Use YOLOv9 GELAN+PGI (or multi-scale FPN at stride 4) so 4–8px defects retain gradient signal.',
    ],
    toddlerCanadianTitle: '1. Fair Gold-Star Points + Clear Magnifying Glass',
    toddlerCanadianAnalogy:
      'Give extra gold stars when the helper spots a rare broken block, and keep a clear magnifying glass on the smallest corners so tiny scratches never fade away.',
  },
  {
    id: 'group_dro',
    title: 'Solution 2: Lot-Grouped Splitting + GroupDRO Worst-Group Optimization',
    citation: 'Sagawa et al. (ICLR 2020) · Validated in WILDS OOD Benchmarks (ICML 2021–2024)',
    mathematicalBasis:
      'Partition data strictly by group g ∈ G (production lot, camera ID, lighting shift) to eliminate temporal leakage, then minimize worst-case expected loss across groups: min_θ max_{g∈G} E_{(x,y)~P_g}[ℓ(θ; x, y)].',
    implementationSteps: [
      'Replace random train_test_split with GroupKFold / StratifiedGroupKFold keyed on lot_id + date.',
      'Track per-camera & per-shift recall separately; upweight the hardest lighting/conveyor group via exponentiated gradient.',
      'Strip background/conveyor margins via OpenCV ROI cropping before classification.',
    ],
    toddlerCanadianTitle: '2. Practice in Every Room & Check the Hardest Corner First',
    toddlerCanadianAnalogy:
      'Never test your friend on the exact same photo they just memorized! Practice in bright rooms and shady rooms, and spend extra time on whichever room is trickiest.',
  },
  {
    id: 'memory_bank',
    title: 'Solution 3: Normal-Only Feature-Space Discrimination (SimpleNet / AnomalyCLIP)',
    citation: 'Liu et al. (CVPR 2023, SimpleNet) & Zhou et al. (ICLR 2024, AnomalyCLIP)',
    mathematicalBasis:
      'Map normal images x ∈ X_norm through frozen pretrained features φ(x), synthesize controlled Gaussian perturbations z^- = φ(x) + ε (ε ~ N(0, σ²I)), and train a lightweight discriminator D_ψ without needing balanced defective labels.',
    implementationSteps: [
      'Freeze a pretrained backbone (e.g. WideResNet50 / DINOv2) in torch.inference_mode() to extract multi-scale patches.',
      'Train only the compact feature adapter + discriminator on verified "OK" boards from multiple shifts.',
      'Score unseen boards by Pixel-AUROC and PRO-score; calibrate threshold via 99.5th percentile on clean validation lots.',
    ],
    toddlerCanadianTitle: '3. Learn What "Neat and Tidy" Looks Like First',
    toddlerCanadianAnalogy:
      'Instead of waiting to collect 1,000 broken toys, just teach the helper what a shiny, unbroken toy looks like. Then anything chipped or bumpy stands right out!',
  },
];
