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

// Card-specific subtitles — randomized each time user flips to that card
export const CARD_SUBTITLES: Record<number, string[]> = {
  0: [
    "Based on your swing radar, we've identified 3 possible GolfTI matches...",
    "Your swing tells a story — here's what the radar picked up...",
    "Interesting patterns in your swing dimensions. Let's see what they mean...",
    "The radar has spoken. Your swing reveals 3 distinct personality possibilities...",
    "We mapped every angle of your swing. The results? Three possible GolfTIs...",
    "Your swing data is in. The radar detected 3 personality matches...",
    "Five dimensions, one swing, three possible GolfTI types waiting to be revealed...",
    "The numbers don't lie. Your radar points to 3 distinct golf personalities...",
    "We crunched the numbers on your swing. Three GolfTI types emerged...",
    "Your swing fingerprint is unique. The radar found 3 possible matches...",
  ],
  1: [
    "Your GolfTI could possibly be...",
    "First match incoming — your GolfTI might just be...",
    "The radar's top pick — your swing suggests...",
    "Drumroll... your first possible GolfTI is...",
    "The data points to this one first — could your GolfTI be...",
    "Strongest match from the radar — your GolfTI might be...",
    "Here's your first possible GolfTI type...",
    "The numbers lean this way — your GolfTI could be...",
    "Match one of three — your GolfTI is possibly...",
    "First reveal — is your GolfTI...",
  ],
  2: [
    "Or it could also be...",
    "But wait — it might also be...",
    "Don't count this one out either — it could be...",
    "Or perhaps your swing is more like...",
    "Then again, the data also suggests...",
    "Another strong possibility — or your GolfTI could be...",
    "But the radar also picked up traces of...",
    "Or maybe your true GolfTI is actually...",
    "Not so fast — there's another match. It could be...",
    "Or let's consider this one — your GolfTI might also be...",
  ],
  3: [
    "And it could also be...",
    "One more possibility — your GolfTI might also be...",
    "And last but not least, it could be...",
    "The third match rounds it out — your GolfTI could also be...",
    "And for our final reveal, it might be...",
    "Surprise third option — your GolfTI could also be...",
    "And the radar's final pick — it could be...",
    "Last one — your GolfTI might also turn out to be...",
    "And rounding out the trio, it could also be...",
    "One more for good measure — your GolfTI could also be...",
  ],
  4: [
    "Want the full breakdown? Download SneakySwing.",
    "There's more where that came from — get the app.",
    "Curious about the deep dive? Our app has the answers.",
    "Ready to go deeper? SneakySwing reveals everything.",
    "Your full swing profile is just a download away.",
    "Think you know your GolfTI? The app proves it.",
    "The complete analysis is waiting in the app.",
    "Want every detail? SneakySwing breaks it all down.",
    "There's a whole world of swing insights in the app.",
    "Ready for the full picture? Download SneakySwing.",
  ],
};
