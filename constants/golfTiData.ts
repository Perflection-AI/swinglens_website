export const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';
export const MAX_FILE_SIZE = 18 * 1024 * 1024;
export const ACCEPTED_TYPES = ['video/mp4', 'video/quicktime', 'video/webm'];

// File name mapping: type code → actual SVG filename
export const GOLFTI_TYPE_CODES = ['VOID','GOON','TURF','BOZO','BRUH','COOM','PSSS','DUMB','RIZZ','CRYK','SIMP','COPE','FERL','DEAD','FLAIR','TRSH'] as const;
export type GolfTIType = typeof GOLFTI_TYPE_CODES[number];

export const GOLFTI_TAGLINES: Record<string, string> = {
  VOID: 'So mechanically flawless it makes everyone else at the range question their life choices.',
  GOON: 'Swings at 120% effort and somehow still compresses less than a pillow. The ball is not impressed.',
  TURF: 'The divots are so deep they could bury a small pet. The grass never stood a chance.',
  BOZO: 'Swings like they\'re trying to murder the ball — and the ball is winning.',
  BRUH: 'The backswing writes checks the downswing can\'t cash — and the downswing\'s card gets declined every single time.',
  COOM: 'The mind thinks it\'s a Tour pro. The body is a hard pass. The gap between them is measurable in light-years.',
  PSSS: 'Hits a slice so reliable it has its own flight path. Air traffic control has been notified.',
  DUMB: 'Zero plan, zero structure, zero evidence of brain activity — yet somehow still convinced they\'re one tip away from greatness.',
  RIZZ: 'The outfit costs more than the golf membership. The contact is non-existent. The excuses? World-class.',
  CRYK: 'One bad shot triggers an emotional collapse that lasts the entire bucket. The swing isn\'t the fragile part.',
  SIMP: 'Instagram-perfect form on camera, absolute chaos on contact. The drillfluencer with zero transferable skills.',
  COPE: 'Every single miss is "actually not that bad" — which is exactly what someone in deep denial would say.',
  FERL: 'Pure uncontrolled chaos with enough raw power to injure a bystander. Accidentally. On purpose. Both apply.',
  DEAD: 'The ball travels less distance than their pre-shot routine. The clubface has seen more action this round than the golf ball.',
  FLAIR: 'The finish pose belongs in a museum. The ball contact belongs in a blooper reel.',
  TRSH: 'Every fundamental broken at once, yet somehow still convinced today\'s the day. It is not. It never is.',
};

export const LOADING_MESSAGES: Record<string, { title: string; subtitle: string }> = {
  PREPARING: { title: 'Preparing upload...', subtitle: 'Getting things ready...' },
  UPLOADING: { title: 'Uploading your swing...', subtitle: 'Sending your video to our AI...' },
  ANALYZING: { title: 'Analyzing your GolfTI...', subtitle: 'Our AI is studying every frame of your swing. This may take a moment...' },
};

export const ANALYZING_SUBTITLES = [
  'Our AI is studying every frame of your swing. This may take a moment...',
  'Measuring clubhead speed and swing tempo...',
  'Mapping your wrist hinge and release pattern...',
  'Comparing your swing plane to tour pros...',
  'Analyzing your weight shift and balance...',
  'Calculating your club path and face angle...',
  'Evaluating your takeaway and backswing depth...',
  'Detecting your power generation sequence...',
  'Scanning your impact position and follow-through...',
  'Cross-referencing against 16 GolfTI personality types...',
  'Identifying your unique swing signature...',
  'Computing your rhythm and timing profile...',
  'Assessing your spine angle consistency...',
  'Measuring your hip rotation and shoulder turn...',
  'Building your personalized GolfTI breakdown...',
  'Decoding your grip pressure and hand action...',
  'Analyzing your setup posture and alignment...',
  'Mapping your downswing transition move...',
  'Evaluating your finish position and balance...',
  'Almost there — putting it all together...',
];
