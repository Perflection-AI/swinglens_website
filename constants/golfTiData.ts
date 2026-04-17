export const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';
export const MAX_FILE_SIZE = 18 * 1024 * 1024;
export const ACCEPTED_TYPES = ['video/mp4', 'video/quicktime', 'video/webm'];

// File name mapping: type code → actual SVG filename
export const GOLFTI_TYPE_CODES = ['VOID','GOON','TURF','BOZO','BRUH','COOM','PSSS','DUMB','RIZZ','CRYK','SIMP','COPE','FERL','DEAD','FLAIR','TRSH'] as const;
export type GolfTIType = typeof GOLFTI_TYPE_CODES[number];

export const GOLFTI_TAGLINES: Record<string, string> = {
  VOID: 'Gives off the energy of someone who has already left this world, yet somehow keeps producing disgustingly clean contact.',
  GOON: 'Brings relentless energy and zero compression — the engine runs hot but the wheels don\'t turn.',
  TURF: 'Leaves behind so much turf damage it looks less like golf and more like a hate crime against grass.',
  BOZO: 'Brings nuclear power to every shot and negotiates exactly zero of it.',
  BRUH: 'Everything looks fine until the downswing suddenly turns into a medical emergency.',
  COOM: 'Could write a textbook on swing mechanics. The actual swing suggests the textbook was never opened.',
  PSSS: 'The ball starts leaking right so fast it feels like the clubface already gave up at impact.',
  DUMB: 'No setup, no plan, no visible brain activity, just vibes and blunt force trauma.',
  RIZZ: 'Brings elite swagger, premium confidence, and a surprisingly high ratio of air swings to solid ones.',
  CRYK: 'One bad shot is enough to send them into a full bucket-long emotional collapse.',
  SIMP: 'Copies every coach drill with religious devotion and understands exactly none of it.',
  COPE: 'Calls every horrifying miss "actually not bad" like denial is part of the pre-shot routine.',
  FERL: 'Moves through the swing with the raw, unlicensed energy of a feral dog chasing a shopping cart.',
  DEAD: 'No tempo, no rotation, no pulse, just a legally observable golf swing.',
  FLAIR: 'Came to the range for one clean strike and twelve opportunities to look mysterious in the finish pose.',
  TRSH: 'Fearless. Will swing at anything with zero survival instinct. The commitment is admirable, the result is not.',
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
