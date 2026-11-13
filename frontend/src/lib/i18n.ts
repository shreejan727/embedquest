// ============================================================
// EMBEDQUEST — UI language dictionary (Tanglish / English)
//
// `t('key')` returns the string for the CURRENT language stored
// in the progress state (persisted + cloud-synced). {x} tokens
// are replaced via the params argument.
//
// NOTE: curriculum CONTENT (lesson bodies, quiz questions,
// project instructions, tool tips, teacher answers) stays in
// Tanglish for now — components show an honest "content note"
// in English mode. Only the interface (chrome) is translated.
// ============================================================
import { getSnapshot } from './progress';

export type Lang = 'tanglish' | 'english';

const TANGLISH = {
  // ---- common / nav ----
  nav_home: 'Home',
  nav_worlds: 'Worlds',
  nav_tools: 'Tools',
  nav_projects: 'Projects',
  nav_teacher: 'Teacher',
  nav_profile: 'Profile',
  sidebar_tip: 'Tip: XP kedaikum only for real learning — lessons, quizzes, tasks. Streak flame kaapathunga! 🔥',
  notfound_title: 'Intha page kidaikala',
  notfound_btn: 'Home ku po',
  lang_toggle_title: 'Language / Mozhi',

  // ---- home dashboard ----
  greet: 'Vanakkam, {name}! 👋',
  home_sub: 'Rank: {rank} · Missed days overtime la konjam konjam-a catch pannuvom 💪',
  xp_to_next: '{into}/{need} XP to next level',
  streak_label: 'Streak',
  streak_alive: 'Keep it alive — oru lesson minimum adayam!',
  streak_start: 'Innaike oru lesson pannu, streak start aagum!',
  daily_mission: 'Daily Mission',
  mission_done: 'Completed today! 🎉',
  mission_zone: "Today's mission zone",
  all_done_title: 'Ellaa lessons complete! 🏆',
  all_done_msg: 'Nee legend. Projects page ku po, boss quizzes retry pannu, illa Tools la kalattu!',
  go_projects: 'Go to Projects',
  continue_learning: 'Continue Learning',
  world_progress: 'World Progress',
  world_map_link: 'World map →',
  overall: 'Overall: {done}/{total} lessons ({pct}%)',
  weak_topics: 'Weak Topics (Revise)',
  weak_empty: 'Ippo weak topics illa! Quiz la 70% ku keezha score vantha, intha area la revise list la varum.',
  recent_achievements: 'Recent Achievements',
  badges_empty: 'Badges inga appear aagum — first lesson complete pannunga! 🏅',
  practical_projects: 'Practical Projects',
  all_projects_link: 'All projects →',
  projects_done: '{n} projects completed! Continue build panra quest ku po.',
  projects_none: 'LED blink la start aagum — Minecraft build quest style la unlock aagum. World 5 complete aana projects unlock!',

  // ---- lesson flow ----
  lesson_notfound: 'Lesson kidaikala 🤔',
  lesson_already: '✅ Already completed — best quiz score {score}% (retake anytime)',
  prev_lesson: 'Previous',
  take_quiz: 'Take the quiz',
  lesson_complete: 'Lesson Complete!',
  perfect_bonus: '+10 PERFECT BONUS',
  done_full: 'Full score! Concept solid-a purinjirukku 🔥 Next lesson ready!',
  done_ok: 'Podhum! Idhu ku mela concept revision venum na, lesson ulla thirumbi paaru.',
  next_lesson: 'Next lesson: {title}',
  world_map: 'World map',
  lesson_top: 'Lesson top',
  retake_quiz: 'Retake quiz (best score saved)',
  progress_saved: 'Progress auto-saved.',

  // ---- quiz engine ----
  quiz_pass_msg: 'Super! Concept clear-a irukku. Next level ku po!',
  quiz_fail_msg: 'Kavala padathenga — wrong answers oda explanations paaru, lesson ulla thirumbi revise pannunga, then retry. Understanding dhaan main!',
  retry_quiz: 'Retry quiz',
  quiz_continue: 'Continue →',
  correct: 'Correct! 🎯 ',
  wrong_prompt: 'Konjam theriyum illa? ',
  finish: 'Finish',
  next: 'Next',

  // ---- lesson renderer ----
  practical_task: 'Practical task — {title}',
  task_done_msg: '✅ Task done! (+15 XP already credited)',
  task_btn: 'I finished this task ✓ (+15 XP)',
  content_note: 'Content note: lesson explanations, quiz questions & task steps are currently in Tanglish. English version coming soon!',

  // ---- worlds ----
  worldmap_h1: 'World Map 🗺️',
  worldmap_sub: '11 learning worlds + final project zone. Lesson-a pass pannunga, next world unlock aagum.',
  boss_slain: 'SLAIN ⚔️',
  boss_waiting: 'waiting 💀',
  boss_locked: 'locked',
  project_quests: 'Project quests — build challenges here!',
  locked: 'Locked',
  world_notfound: 'World kidaikala 😅',
  build_quests: '9 Build Quests waiting!',
  build_quests_desc: 'LED blink la irundhu AI capstone varaikkam — step-by-step guides, circuit diagrams, code + line-by-line explanation. Projects page la irukku!',
  open_projects: 'Open Projects',
  world_locked_h: 'World {n} locked 🔒',
  world_locked_desc: 'Munnadi world oda lessons-a complete pannu (70% + boss pass minimum). Game rules dhaan idhu — real learning base ku! Previous world ku po.',
  go_world_map: 'World map ku po',
  boss_battle: '💀 BOSS BATTLE — World {n} Final Quiz',
  conquered: 'Conquered! +100 XP earned.',
  boss_meta: '{n} questions · +100 XP · pass = 70%',
  complete_first: 'Complete all {n} lessons first',
  fight_boss: 'Fight the Boss ⚔️',
  boss_wrong_page: 'Boss intha vazhi illa 😅',
  boss_wrong_desc: 'First world oda ellaa lessons-a complete pannunga. Boss battle appuram dhaan open aagum!',
  back_world: '← Back to world',
  boss_h1: 'World {n} Boss: {title}',
  boss_sub: 'Ovvoru kelvium yosichi paaru — 70%+ vantha boss slain, +100 XP!',

  // ---- onboarding ----
  ob_welcome: 'EMBEDQUEST ku Vanakkam! 🎮',
  ob_welcome_msg: 'Idhu oru game-style learning platform: C programming, electronics, embedded systems and Agentic AI — ellam simple Tanglish la, absolute zero la irundhu. Nee first 10 days class miss pannirukka — no problem, catch-up path naan plan panren. 💪',
  ob_f1_title: '11 Learning Worlds',
  ob_f1_desc: 'Computer basics la irundhu IoT & AI varaikkam — RPG map maari unlock aagum.',
  ob_f2_title: 'XP + Streaks + Bosses',
  ob_f2_desc: 'Duolingo style: daily streak, XP, badges, boss battles. Real learning mattum reward.',
  ob_f3_title: 'Real Projects',
  ob_f3_desc: 'LED blink la irundhu IoT dashboard varaikkam — Minecraft build quest style.',
  ob_start: 'Start my journey',
  ob_step1: 'Step 1 of 2',
  ob_info_h: 'Un info konjam venum 😊',
  ob_privacy: 'Entha data um phone la mattum dhaan save aagum — LocalStorage. Yedhuvum server ku anupuvom illa.',
  ob_name_label: 'Unga name (what should I call you?)',
  ob_name_ph: 'Example: Shreejan',
  ob_time_label: 'Daily learning time yevlo?',
  ob_back: '← Back',
  ob_next_diag: 'Next: Diagnostic test',
  plan_ready: 'Un Catch-Up Path Ready!',
  plan_msg: '{name}, diagnostic results base la intha order la learn pannina, missed 10 days ku badhila fast-a catch-up pannuvom. Weak areas first — strong areas later. 😎',
  plan_order: 'Recommended order',
  plan_stats: 'Lessons completed so far: {n} · Daily goal: {min} min',
  plan_start: 'Start learning now 🚀',

  // ---- diagnostic ----
  diag_ready: 'Un Catch-Up Plan Ready!',
  diag_ready_msg: 'Results vechu paatha, weak worlds first. Idhu dhaan un personalized order:',
  diag_start: 'Start catch-up 🚀',
  diag_h1: 'Beginner Diagnostic',
  diag_msg: '{name}, 12 quick questions — ellame basics dhaan. Correct answer teriyalaina guess pannu, kavalai illa! Idhu dhaan un catch-up path shape pannum. Wrong answer ku punish illa 😊',
  diag_explain: 'Topic: {topic} — un plan la idhu count aagum.',

  // ---- tools ----
  tools_h1: 'Interactive Tools 🧰',
  tools_sub: 'Hands-on mini tools — lesson concepts-a live-a try pannunga. First use per day = +5 XP!',
  tools_content_note: 'Content note: in-tool tips & explanations are currently in Tanglish. English version coming soon!',

  // ---- projects ----
  projects_h1: 'Build Quests 🔨',
  projects_sub: '9 guided practical projects — Minecraft build style. Ovvonnum full guide: circuit, code, line-by-line explanation, troubleshooting. Low voltage mattum — safety first!',
  projects_tip: '💡 Tip: Projects easy-a feel panna, World 5 (Basic Electronics) mudichu vaanga. Aana curious-a irundha LED blink (p1) ippo try pannalam — no rule stops you!',
  projects_lock_note: 'Checklist full-a complete pannunga, appuram XP claim button varum.',
  project_notfound: 'Project kidaikala 🤔',
  project_back: '← All projects',
  project_content_note: 'Content note: project instructions & code explanations are currently in Tanglish. English version coming soon!',

  // ---- teacher ----
  teacher_h1: 'AI Teacher 🤖',
  teacher_sub: 'Eppovum keyirukura study buddy — doubt kelu, explain pannuven.',
  teacher_local_note: 'Local Teacher Mode (offline) — answers Tanglish la dhaan varum.',
  teacher_remote_note: 'Connected AI mode',
  teacher_thinking: 'yosikkiren...',
  teacher_ph: "Example: Ohm's law epdi work aagudhu?",
  teacher_hint_mode: 'Hint mode ON — answer solla maaten, clue mattum!',

  // ---- auth ----
  auth_hero_h: 'Embedded systems-a game madhiri kathukonga.',
  auth_hero_p: '11 worlds • 90 lessons • 79 boss battles • 8 tools • 9 hands-on projects. C programming, electronics, Arduino, IoT & Agentic AI — ellaam simple Tanglish la.',
  auth_hero_l1: '⚡ XP, levels, streaks & badges — progress cloud la save',
  auth_hero_l2: '📱 Laptop + mobile — same account, same progress',
  auth_hero_l3: '🧠 Offline AI Teacher — internet illa-naalum kathukalaam',
  auth_welcome: 'Welcome back! 👋',
  auth_signup_t: 'Create your account 🚀',
  auth_forgot_t: 'Reset password 🔑',
  auth_check_t: 'Check your inbox 📬',
  auth_forgot_p: 'Account email-a type pannunga — reset link anuppaen.',
  auth_name: 'Your name',
  auth_email: 'Email',
  auth_password: 'Password',
  auth_pass_ph: 'min 6 characters',
  auth_wait: 'Wait pannunga…',
  auth_login: 'Log in',
  auth_create: 'Create account',
  auth_send_reset: 'Send reset link',
  auth_no_account: 'Account illaya? Sign up pannunga →',
  auth_forgot_link: 'Password maranthutten aa?',
  auth_back_login: '← Back to log in',
  auth_check_p: '{email} ku oru link anachirukken. Inbox-a check pannunga (spam folder um paarunga).',
  auth_local_t: 'Local mode 💾',
  auth_local_p: 'Cloud login innum set up aagala — Supabase credentials config pannala. Ippo guest mode la aadu start pannalaam: ella features work aagum, but progress indha browser la mattum save aagum (cloud sync illa).',
  auth_local_dev: 'Developer note: README la .env.example paaru — VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY add pannina cloud login activate aagum.',
  auth_guest: 'Continue as guest',
  err_email: 'Email format sari illa — paaru (e.g. you@mail.com).',
  err_pass: 'Password minimum 6 characters venum.',
  err_name: 'Unga name-a type pannunga (2 letters at least).',

  // ---- profile ----
  profile_h1: 'Profile 👤',
  profile_sub_cloud: 'Progress cloud la sync aagum — laptop, mobile ella device layum same-a irukkum.',
  profile_sub_local: 'Ella progress um indha browser la mattum save aagum (LocalStorage).',
  account_cloud: 'Account & Cloud Sync',
  profile_local_p: 'Cloud database innum set up aagala — ella progress um indha browser la mattum. Developers ku: .env.example file la Supabase setup instructions irukku.',
  last_sync: 'Last sync:',
  synced_now: 'ippo thaan',
  min_ago: '{n} min munnadi',
  hrs_ago: '{n} hrs munnadi',
  days_ago: '{n} days munnadi',
  not_synced: 'innum sync aagala',
  sync_ok: '✓ Ella changes um cloud la irukku',
  sync_pending: 'Sync pannitu irukku…',
  sync_err: '⚠️ Sync error: {msg}',
  change_password: 'Change password',
  new_pass_ph: 'Pudhu password (min 6)',
  new_pass2_ph: 'Pudhu password (confirm)',
  update_password: 'Update password',
  pass_ok: '✅ Password update aachu!',
  sign_out: 'Sign out',
  signout_hint: 'Vera device la same account la login pannina, indha progress adhulayum vandhurum.',
  guest_mode: 'guest mode',
  guest_p: 'Nee guest mode la irukku — progress indha browser la mattum. Account create pannina ella device layum sync aagum.',
  guest_btn: 'Sign in / Create account',
  settings_h: 'Settings',
  daily_goal: 'Daily goal:',
  theme_label: 'Theme:',
  lang_label: 'Language:',
  lang_tanglish: 'Tanglish 🇮🇳',
  lang_english: 'English 🇬🇧',
  theme_dark: 'Dark',
  theme_light: 'Light',
  toggle_hint: '(top bar la toggle)',
  reset_title: 'Reset progress',
  reset_confirm: 'Ellaa progress (XP, badges, lessons, projects) delete aagum{cloud} Sure-va?',
  reset_yes: 'Yes, reset everything',
  cancel: 'Cancel',
  name_edit: 'Name edit pannu',
  name_short: 'Name romba short-a irukku.',
  save: 'Save',
  lessons_done: 'Lessons done',
  tasks_done: 'Tasks done',
  badges_label: 'Badges',
  streak_cal: 'Last 14 days',
  streak_tip: 'Ovvoru nallaiyum oru lesson — streak save aagum!',
  reset_cloud_too: ' — cloud la um!',

  // ---- misc ----
  min: 'min',
} as const;

export type DictKey = keyof typeof TANGLISH;

const ENGLISH: Partial<Record<DictKey, string>> = {
  // ---- common / nav ----
  nav_worlds: 'Worlds',
  nav_projects: 'Projects',
  sidebar_tip: 'Tip: XP is earned only for real learning — lessons, quizzes, tasks. Keep that streak flame alive! 🔥',
  notfound_title: 'This page does not exist',
  notfound_btn: 'Go home',
  lang_toggle_title: 'Language / Mozhi',

  // ---- home ----
  greet: 'Welcome, {name}! 👋',
  home_sub: 'Rank: {rank} · Little by little, we will catch up the missed days 💪',
  xp_to_next: '{into}/{need} XP to next level',
  streak_alive: 'Keep it alive — at least one lesson a day!',
  streak_start: 'Do one lesson today and your streak starts!',
  daily_mission: 'Daily Mission',
  mission_done: 'Completed today! 🎉',
  mission_zone: "Today's mission zone",
  all_done_title: 'All lessons complete! 🏆',
  all_done_msg: "You're a legend. Visit the Projects page, retry boss quizzes, or explore the Tools!",
  go_projects: 'Go to Projects',
  continue_learning: 'Continue Learning',
  world_progress: 'World Progress',
  world_map_link: 'World map →',
  overall: 'Overall: {done}/{total} lessons ({pct}%)',
  weak_topics: 'Weak Topics (Revise)',
  weak_empty: 'No weak topics right now! If a quiz score falls below 70%, the lesson shows up here for revision.',
  recent_achievements: 'Recent Achievements',
  badges_empty: 'Badges will appear here — complete your first lesson! 🏅',
  practical_projects: 'Practical Projects',
  all_projects_link: 'All projects →',
  projects_done: '{n} projects completed! Continue your building quest.',
  projects_none: 'It all starts with an LED blink — unlocked Minecraft-build-quest style. Complete World 5 to unlock projects!',

  // ---- lesson flow ----
  lesson_notfound: 'Lesson not found 🤔',
  lesson_already: '✅ Already completed — best quiz score {score}% (retake anytime)',
  prev_lesson: 'Previous',
  take_quiz: 'Take the quiz',
  lesson_complete: 'Lesson Complete!',
  done_full: 'Full score! You understood the concept solidly 🔥 Next lesson is ready!',
  done_ok: 'Well done! If you want to revise the concept, go through the lesson again.',
  next_lesson: 'Next lesson: {title}',
  lesson_top: 'Lesson top',
  retake_quiz: 'Retake quiz (best score saved)',
  progress_saved: 'Progress auto-saved.',

  // ---- quiz engine ----
  quiz_pass_msg: 'Great! The concept is clear. On to the next level!',
  quiz_fail_msg: "Don't worry — read the explanations for the wrong answers, revise the lesson, then retry. Understanding is what matters!",
  retry_quiz: 'Retry quiz',
  quiz_continue: 'Continue →',
  correct: 'Correct! 🎯 ',
  wrong_prompt: 'Not quite — check this: ',
  finish: 'Finish',
  next: 'Next',

  // ---- lesson renderer ----
  practical_task: 'Practical task — {title}',
  task_done_msg: '✅ Task done! (+15 XP already credited)',
  task_btn: 'I finished this task ✓ (+15 XP)',
  content_note: 'Content note: lesson explanations, quiz questions & task steps are currently in Tanglish. English version coming soon!',

  // ---- worlds ----
  worldmap_sub: "11 learning worlds + final project zone. Pass a world's lessons to unlock the next world.",
  boss_slain: 'SLAIN ⚔️',
  boss_waiting: 'waiting 💀',
  boss_locked: 'locked',
  project_quests: 'Project quests — build challenges here!',
  locked: 'Locked',
  world_notfound: 'World not found 😅',
  build_quests: '9 Build Quests waiting!',
  build_quests_desc: 'From LED blink to AI capstone — step-by-step guides, circuit diagrams, code + line-by-line explanation. See the Projects page!',
  open_projects: 'Open Projects',
  world_locked_h: 'World {n} locked 🔒',
  world_locked_desc: "Complete the previous world's lessons first (70% + boss pass minimum). Those are the game rules — a real learning foundation! Go back to the previous world.",
  go_world_map: 'Back to world map',
  boss_battle: '💀 BOSS BATTLE — World {n} Final Quiz',
  conquered: 'Conquered! +100 XP earned.',
  boss_meta: '{n} questions · +100 XP · pass = 70%',
  complete_first: 'Complete all {n} lessons first',
  fight_boss: 'Fight the Boss ⚔️',
  boss_wrong_page: 'The boss is not here 😅',
  boss_wrong_desc: 'Complete all lessons of the world first. The boss battle opens only after that!',
  back_world: '← Back to world',
  boss_h1: 'World {n} Boss: {title}',
  boss_sub: 'Think about every question — 70%+ and the boss is slain, +100 XP!',

  // ---- onboarding ----
  ob_welcome: 'Welcome to EMBEDQUEST! 🎮',
  ob_welcome_msg: 'This is a game-style learning platform: C programming, electronics, embedded systems and Agentic AI — from absolute zero. You missed the first 10 days of class? No problem, I will plan a catch-up path for you. 💪',
  ob_f1_desc: 'From computer basics to IoT & AI — unlocked like an RPG map.',
  ob_f2_desc: 'Duolingo style: daily streak, XP, badges, boss battles. Only real learning is rewarded.',
  ob_f3_desc: 'From LED blink to IoT dashboard — Minecraft build-quest style.',
  ob_start: 'Start my journey',
  ob_info_h: 'I need a little info 😊',
  ob_privacy: 'Everything is saved only on this device (LocalStorage). Nothing is sent to any server.',
  ob_name_label: 'Your name (what should I call you?)',
  ob_name_ph: 'Example: Shreejan',
  ob_time_label: 'Daily learning time?',
  ob_back: '← Back',
  ob_next_diag: 'Next: Diagnostic test',
  plan_ready: 'Your catch-up path is ready!',
  plan_msg: '{name}, follow this order based on your diagnostic results to quickly catch up on the 10 missed days. Weak areas first — strong areas later. 😎',
  plan_order: 'Recommended order',
  plan_stats: 'Lessons completed so far: {n} · Daily goal: {min} min',
  plan_start: 'Start learning now 🚀',

  // ---- diagnostic ----
  diag_ready: 'Your catch-up plan is ready!',
  diag_ready_msg: 'Based on the results, weak worlds come first. This is your personalized order:',
  diag_start: 'Start catch-up 🚀',
  diag_msg: "{name}, 12 quick questions — all basics. If you don't know an answer, just guess, no worries! This shapes your catch-up path. Wrong answers are not punished 😊",
  diag_explain: 'Topic: {topic} — this counts towards your plan.',

  // ---- tools ----
  tools_sub: 'Hands-on mini tools — try lesson concepts live. First use each day = +5 XP!',
  tools_content_note: 'Content note: in-tool tips & explanations are currently in Tanglish. English version coming soon!',

  // ---- projects ----
  projects_sub: '9 guided practical projects — Minecraft build style. Every one has a full guide: circuit, code, line-by-line explanation, troubleshooting. Low voltage only — safety first!',
  projects_tip: "💡 Tip: For an easier start, finish World 5 (Basic Electronics) first. But if you're curious, try LED blink (p1) right now — no rule stops you!",
  projects_lock_note: 'Complete the whole checklist first — then the XP claim button appears.',
  project_notfound: 'Project not found 🤔',
  project_back: '← All projects',
  project_content_note: 'Content note: project instructions & code explanations are currently in Tanglish. English version coming soon!',

  // ---- teacher ----
  teacher_sub: 'Your always-available study buddy — ask a doubt, get an explanation.',
  teacher_local_note: 'Local Teacher Mode (offline) — answers come in Tanglish.',
  teacher_thinking: 'thinking...',
  teacher_ph: "Example: How does Ohm's law work?",

  // ---- auth ----
  auth_hero_h: 'Learn embedded systems like a game.',
  auth_hero_p: '11 worlds • 90 lessons • 79 boss battles • 8 tools • 9 hands-on projects. C programming, electronics, Arduino, IoT & Agentic AI — in simple Tanglish.',
  auth_hero_l1: '⚡ XP, levels, streaks & badges — progress saved in the cloud',
  auth_hero_l2: '📱 Laptop + mobile — same account, same progress',
  auth_hero_l3: '🧠 Offline AI Teacher — keeps teaching even without internet',
  auth_welcome: 'Welcome back! 👋',
  auth_forgot_p: 'Type your account email — I will send a reset link.',
  auth_name: 'Your name',
  auth_email: 'Email',
  auth_password: 'Password',
  auth_pass_ph: 'min 6 characters',
  auth_wait: 'Please wait…',
  auth_login: 'Log in',
  auth_create: 'Create account',
  auth_send_reset: 'Send reset link',
  auth_no_account: 'No account? Sign up →',
  auth_forgot_link: 'Forgot your password?',
  auth_back_login: '← Back to log in',
  auth_check_p: 'A link was sent to {email}. Check your inbox (and the spam folder).',
  auth_local_t: 'Local mode 💾',
  auth_local_p: 'Cloud login is not set up yet — Supabase credentials are not configured. You can start as a guest: every feature works, but progress is saved in this browser only (no cloud sync).',
  auth_local_dev: 'Developer note: see .env.example in the README — adding VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY activates cloud login.',
  auth_guest: 'Continue as guest',
  err_email: 'That email format does not look right (e.g. you@mail.com).',
  err_pass: 'Password needs at least 6 characters.',
  err_name: 'Type your name (at least 2 letters).',

  // ---- profile ----
  profile_sub_cloud: 'Progress syncs to the cloud — laptop and mobile always show the same thing.',
  profile_sub_local: 'All progress is saved in this browser only (LocalStorage).',
  account_cloud: 'Account & Cloud Sync',
  profile_local_p: 'The cloud database is not set up yet — all progress stays in this browser. For developers: Supabase setup instructions are in the .env.example file.',
  last_sync: 'Last sync:',
  synced_now: 'just now',
  min_ago: '{n} min ago',
  hrs_ago: '{n} hrs ago',
  days_ago: '{n} days ago',
  not_synced: 'not synced yet',
  sync_ok: '✓ All changes are in the cloud',
  sync_pending: 'Syncing…',
  change_password: 'Change password',
  new_pass_ph: 'New password (min 6)',
  new_pass2_ph: 'Confirm new password',
  update_password: 'Update password',
  pass_ok: '✅ Password updated!',
  sign_out: 'Sign out',
  signout_hint: 'Log in with the same account on another device and this progress will appear there.',
  guest_mode: 'guest mode',
  guest_p: 'You are in guest mode — progress is saved in this browser only. Create an account to sync across devices.',
  guest_btn: 'Sign in / Create account',
  settings_h: 'Settings',
  daily_goal: 'Daily goal:',
  theme_label: 'Theme:',
  lang_label: 'Language:',
  theme_dark: 'Dark',
  theme_light: 'Light',
  toggle_hint: '(toggle in the top bar)',
  reset_title: 'Reset progress',
  reset_confirm: 'All progress (XP, badges, lessons, projects) will be deleted{cloud} Are you sure?',
  reset_yes: 'Yes, reset everything',
  cancel: 'Cancel',
  name_edit: 'Edit name',
  name_short: 'That name is too short.',
  save: 'Save',
  lessons_done: 'Lessons done',
  tasks_done: 'Tasks done',
  streak_cal: 'Last 14 days',
  streak_tip: 'One lesson every day keeps the streak alive!',
  reset_cloud_too: ' — and in the cloud!',
};

const DICT: Record<Lang, Partial<Record<DictKey, string>>> = {
  tanglish: TANGLISH,
  english: ENGLISH,
};

/** Translate a UI string for the current language, with {token} interpolation. */
export function t(key: DictKey, params: Record<string, string | number> = {}): string {
  const lang = getSnapshot().language ?? 'tanglish';
  let s = DICT[lang][key] ?? TANGLISH[key] ?? String(key);
  for (const [k, v] of Object.entries(params)) {
    s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
  }
  return s;
}

/** Human-friendly relative time string, language-aware. */
export function timeAgoLocalized(iso: string | undefined): string {
  if (!iso) return t('not_synced');
  const secs = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 1000));
  if (secs < 60) return t('synced_now');
  if (secs < 3600) return t('min_ago', { n: Math.floor(secs / 60) });
  if (secs < 86400) return t('hrs_ago', { n: Math.floor(secs / 3600) });
  return t('days_ago', { n: Math.floor(secs / 86400) });
}
