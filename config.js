// ============================================================
// CONFIGURATION — à remplir une seule fois (voir README.md)
// ============================================================
window.APP_CONFIG = {
  // URL de votre projet Supabase (Dashboard > Settings > API)
  supabaseUrl: "https://wbbqnrynpbrakihnqxtz.supabase.co",

  // Clé "anon / public" de votre projet Supabase
  supabaseAnonKey: "sb_publishable_ihlHNtrc3a_xnmmRN4lAYA_rkI1Emhu",

  // Nom du bucket de stockage (créé dans Supabase > Storage)
  bucket: "media",

  // Durée d'affichage de chaque photo (en secondes)
  imageSeconds: 10,

  // Taille max (en Mo) mise en cache localement pendant la lecture,
  // pour ne pas re-télécharger les fichiers à chaque boucle
  cacheLimitMB: 300,
};
