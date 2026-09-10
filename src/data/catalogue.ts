import { Release, Artist, TourDate, LatestSong } from '../types';

// High-impact concert & studio images representing Anirudh's stadium and cinematic aura
export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2400&q=85'; // Epic concert stage / stadium energy with amber spotlights & deep teal atmospheric smoke

export const VINYL_TEXTURE_IMAGE =
  'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80'; // concentric vinyl groove lathe cut

// The exact 10 Latest Songs: 100% Authentic, Certified Real Hits by Anirudh Ravichander
export const LATEST_10_SONGS: LatestSong[] = [
  { rank: 1, title: 'Chuttamalle', movie: 'Devara: Part 1', year: '2024', duration: '03:42', type: 'Global Viral Chartbuster (Feat. Shilpa Rao)' },
  { rank: 2, title: 'Fear Song', movie: 'Devara: Part 1', year: '2024', duration: '03:16', type: 'Heavy Bass Mass Anthem' },
  { rank: 3, title: 'Manasilaayo', movie: 'Vettaiyan', year: '2024', duration: '04:21', type: 'Superhit Festival Groove (Feat. Malaysia Vasudevan)' },
  { rank: 4, title: 'Hunter Vantaar', movie: 'Vettaiyan', year: '2024', duration: '03:12', type: 'Roaring Rajinikanth Brass Theme' },
  { rank: 5, title: 'Coolie Disco', movie: 'Coolie', year: '2024', duration: '03:34', type: 'Retro Electro-Brass Disco Teaser' },
  { rank: 6, title: 'Dheema', movie: 'Love Insurance Kompany', year: '2024', duration: '03:58', type: 'Soulful Acoustic Romance Hit' },
  { rank: 7, title: 'Hukum - Thalaivar Alappara', movie: 'Jailer', year: '2023', duration: '03:27', type: 'Career-Defining Mass Masterpiece' },
  { rank: 8, title: 'Badass', movie: 'Leo', year: '2023', duration: '03:51', type: 'Industrial Rock Power Track' },
  { rank: 9, title: 'Naa Ready', movie: 'Leo', year: '2023', duration: '04:08', type: 'Stadium Street Kuthu (Feat. Thalapathy Vijay)' },
  { rank: 10, title: 'Chaleya', movie: 'Jawan', year: '2023', duration: '03:20', type: 'Global Chart-Topper (Feat. Arijit Singh & Shilpa Rao)' },
];

export const RELEASES: Release[] = [
  {
    id: 'ani-masterpiece',
    code: 'ANI-LTD-01',
    title: 'The Masterpiece Cut (Dual-Sided Collector)',
    artist: 'Anirudh Ravichander',
    year: '2024',
    rpm: '33⅓ RPM',
    format: '180g Heavy Chrome Foil Slipcase & Silver Lacquer',
    edition: 'Edition of 1,000 Numbered Pressings',
    runoutEtch: 'ANI-01-M1 "FREQUENCIES SHAKE THE STADIUM"',
    coverImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    dominantTone: '#0C0F12',
    accentColor: 'amber',
    description:
      'The definitive career-spanning physical pressing. Side A captures five earthquake-intensity cinematic mass anthems; Side B cuts five globally trending soulful synth and acoustic melodies.',
    tracks: [
      // SIDE A: Cinematic Blockbusters & Mass Anthems
      { title: 'Hukum - Thalaivar Alappara', movie: 'Jailer', duration: '03:27', side: 'A', genre: 'Mass Anthem' },
      { title: 'Badass', movie: 'Leo', duration: '03:51', side: 'A', genre: 'Industrial Rock' },
      { title: 'Naa Ready', movie: 'Leo', duration: '04:08', side: 'A', genre: 'Stadium Kuthu' },
      { title: 'Zinda Banda', movie: 'Jawan', duration: '04:24', side: 'A', genre: 'Explosive Brass' },
      { title: 'Marana Mass', movie: 'Petta', duration: '03:36', side: 'A', genre: 'Folk-Electronic Brass' },
      // SIDE B: Soulful Melodies & Modern Synth Fusions
      { title: 'Chaleya', movie: 'Jawan', duration: '03:20', side: 'B', genre: 'Romantic Synthwave' },
      { title: 'Chuttamalle', movie: 'Devara: Part 1', duration: '03:42', side: 'B', genre: 'Carnatic-Soul Melodic Fusion' },
      { title: 'Arabic Kuthu - Halamithi Habibo', movie: 'Beast', duration: '04:39', side: 'B', genre: 'Arabic-Kuthu Club Fusion' },
      { title: 'Megham Karukatha', movie: 'Thiruchitrambalam', duration: '04:07', side: 'B', genre: 'Soulful Monsoon Romance' },
      { title: 'Why This Kolaveri Di', movie: '3', duration: '04:05', side: 'B', genre: 'Acoustic Viral Masterpiece' },
    ],
  },
  {
    id: 'ani-2024-devara-vettaiyan',
    code: 'ANI-LTD-02',
    title: 'Devara & Vettaiyan: The 2024 Titans',
    artist: 'Anirudh Ravichander',
    year: '2024',
    rpm: '45 RPM',
    format: '180g Translucent Smoke & Amber Rim',
    edition: 'Edition of 750 Numbered Pressings',
    runoutEtch: 'ANI-02-A1 "ALL HAIL THE TIGER • HUNTER VANTAAR"',
    coverImage:
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80',
    dominantTone: '#12161A',
    accentColor: 'teal',
    description:
      'Anirudh’s monumental 2024 theatrical suites: the high-octane ocean symphony of Devara Part 1 paired with the roaring brass and retro rhythm of Superstar Rajinikanth’s Vettaiyan.',
    tracks: [
      { title: 'Fear Song', movie: 'Devara: Part 1', duration: '03:16', side: 'A', genre: 'Heavy Symphonic Bass' },
      { title: 'Chuttamalle', movie: 'Devara: Part 1', duration: '03:42', side: 'A', genre: 'Romantic Melodic Hit' },
      { title: 'Daavudi', movie: 'Devara: Part 1', duration: '03:26', side: 'A', genre: 'High-Energy Dance Beat' },
      { title: 'Manasilaayo', movie: 'Vettaiyan', duration: '04:21', side: 'B', genre: 'Folk Festival Fusion' },
      { title: 'Hunter Vantaar', movie: 'Vettaiyan', duration: '03:12', side: 'B', genre: 'Mass Brass Theme' },
      { title: 'Coolie Disco', movie: 'Coolie', duration: '03:34', side: 'B', genre: 'Retro Disco Horns' },
    ],
  },
  {
    id: 'ani-leo-jawan',
    code: 'ANI-LTD-03',
    title: 'Leo & Jawan: Dual Titan Cut',
    artist: 'Anirudh Ravichander',
    year: '2023',
    rpm: '33⅓ RPM',
    format: 'Gatefold Heavy Double LP with Matte Silver Inlay',
    edition: 'Edition of 1,200 Numbered Pressings',
    runoutEtch: 'ANI-03-B2 "BLOODY SWEET • READY READY"',
    coverImage:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
    dominantTone: '#0F1317',
    accentColor: 'amber',
    description:
      'The twin thunderbolts of 2023 that shook global box offices. Heavy 808 sub-bass, gritty distorted guitars, and soaring strings cut for maximum dynamic range.',
    tracks: [
      { title: 'Badass (Bloody Sweet)', movie: 'Leo', duration: '03:51', side: 'A', genre: 'Industrial Bass' },
      { title: 'Naa Ready', movie: 'Leo', duration: '04:08', side: 'A', genre: 'Mass Celebration' },
      { title: 'Ordinary Person', movie: 'Leo', duration: '02:22', side: 'A', genre: 'Atmospheric Trip-Hop' },
      { title: 'Zinda Banda', movie: 'Jawan', duration: '04:24', side: 'B', genre: 'Mass Brass & Dhol' },
      { title: 'Chaleya', movie: 'Jawan', duration: '03:20', side: 'B', genre: 'Romantic Groove' },
      { title: 'Not Ramaiya Vastavaiya', movie: 'Jawan', duration: '03:23', side: 'B', genre: 'Electro Dance' },
    ],
  },
  {
    id: 'ani-vikram-beast',
    code: 'ANI-LTD-04',
    title: 'Vikram & Beast: Pulse of Chennai',
    artist: 'Anirudh Ravichander',
    year: '2022',
    rpm: '33⅓ RPM',
    format: '180g Jet-Black Carbon with Liquid Chrome Etch',
    edition: 'Edition of 600 Numbered Pressings',
    runoutEtch: 'ANI-04-A1 "ONCE UPON A TIME THERE LIVED A GHOST"',
    coverImage:
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=900&q=80',
    dominantTone: '#0A0E12',
    accentColor: 'teal',
    description:
      'The revolutionary soundtrack that redefined South Indian action music: the legendary Vikram synth pulse meets the global Arabic Kuthu chart phenomenon.',
    tracks: [
      { title: 'Vikram Title Track', movie: 'Vikram', duration: '03:42', side: 'A', genre: 'Synthwave Electro' },
      { title: 'Pathala Pathala', movie: 'Vikram', duration: '03:31', side: 'A', genre: 'Chennai Folk Kuthu' },
      { title: 'Once Upon a Time', movie: 'Vikram', duration: '02:24', side: 'A', genre: 'Haunting Cinema Theme' },
      { title: 'Arabic Kuthu - Halamithi Habibo', movie: 'Beast', duration: '04:39', side: 'B', genre: 'Fusion Kuthu' },
      { title: 'Jolly O Gymkhana', movie: 'Beast', duration: '03:32', side: 'B', genre: 'Upbeat Calypso' },
      { title: 'Beast Mode', movie: 'Beast', duration: '03:40', side: 'B', genre: 'Heavy EDM Theme' },
    ],
  },
  {
    id: 'ani-petta-master',
    code: 'ANI-LTD-05',
    title: 'Master & Petta: The Mass Brass Era',
    artist: 'Anirudh Ravichander',
    year: '2021',
    rpm: '33⅓ RPM',
    format: 'Heavyweight Matte Cardboard & Gold Leaf Stamping',
    edition: 'Edition of 500 Numbered Pressings',
    runoutEtch: 'ANI-05-A2 "VAATHI COMING OTTHA SOLLA"',
    coverImage:
      'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=900&q=80',
    dominantTone: '#111417',
    accentColor: 'amber',
    description:
      'Celebrating the historic Rajinikanth collaboration on Petta and the thunderous Vijay chart-topper Master. Raw street percussion elevated to symphonic glory.',
    tracks: [
      { title: 'Vaathi Coming', movie: 'Master', duration: '03:50', side: 'A', genre: 'Street Kuthu Beat' },
      { title: 'Vaathi Raid', movie: 'Master', duration: '03:30', side: 'A', genre: 'Hardcore Hip-Hop' },
      { title: 'Master the Blaster', movie: 'Master', duration: '01:32', side: 'A', genre: 'Reggae Chill' },
      { title: 'Marana Mass', movie: 'Petta', duration: '03:36', side: 'B', genre: 'Brass Folk' },
      { title: 'Petta Paraak', movie: 'Petta', duration: '03:58', side: 'B', genre: 'Symphonic War Cry' },
      { title: 'Ullaallaa', movie: 'Petta', duration: '04:56', side: 'B', genre: 'Retro Rock' },
    ],
  },
  {
    id: 'ani-origins-kolaveri',
    code: 'ANI-LTD-06',
    title: 'Origins & Classics: 3, Kaththi & VIP',
    artist: 'Anirudh Ravichander',
    year: '2012',
    rpm: '45 RPM',
    format: '10" Lathe Cut Single with Archival Studio Notes',
    edition: 'Edition of 400 Numbered Pressings',
    runoutEtch: 'ANI-06-A1 "WHERE IT ALL BEGAN • 2011 VIRAL CUT"',
    coverImage:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    dominantTone: '#0E1114',
    accentColor: 'teal',
    description:
      'The viral spark that took over YouTube globally in 2011 with Kolaveri Di, paired with the iconic Sword of Kaththi symphony and the youth anthem VIP.',
    tracks: [
      { title: 'Why This Kolaveri Di', movie: '3', duration: '04:05', side: 'A', genre: 'Acoustic Viral Pop' },
      { title: 'Po Nee Po', movie: '3', duration: '04:15', side: 'A', genre: 'Melodic Heartbreak' },
      { title: 'Velaiilla Pattadhari (VIP)', movie: 'VIP', duration: '03:58', side: 'A', genre: 'High-Spirited Youth Anthem' },
      { title: 'Kaththi Theme (Sword of Satyamev)', movie: 'Kaththi', duration: '02:30', side: 'B', genre: 'Symphonic Masterpiece' },
      { title: 'Selfie Pulla', movie: 'Kaththi', duration: '04:52', side: 'B', genre: 'Electro Dance' },
      { title: "Don'u Don'u Don'u", movie: 'Maari', duration: '03:15', side: 'B', genre: 'Indie Pop Romance' },
    ],
  },
];

export const ARTISTS: Artist[] = [
  {
    id: 'collab-01',
    code: 'ANI-VOC-01',
    name: 'Jonita Gandhi',
    origin: 'Toronto / Mumbai',
    releasesCount: 12,
    discipline: 'Vocal Collaborator ("Arabic Kuthu", "Chellama", "Jimikki Ponnu")',
  },
  {
    id: 'collab-02',
    code: 'ANI-VOC-02',
    name: 'Kamal Haasan',
    origin: 'Chennai',
    releasesCount: 4,
    discipline: 'Legendary Vocalist & Conceptual Catalyst ("Pathala Pathala")',
  },
  {
    id: 'collab-03',
    code: 'ANI-VOC-03',
    name: 'Sean Roldan',
    origin: 'Chennai',
    releasesCount: 8,
    discipline: 'Acoustic Guitar, Banjo & Soul Vocals ("Megham Karukatha")',
  },
  {
    id: 'collab-04',
    code: 'ANI-VOC-04',
    name: 'Anthony Daasan',
    origin: 'Tiruvannamalai',
    releasesCount: 6,
    discipline: 'Traditional Folk Percussion & Raw Street Anthems ("Sodakku")',
  },
  {
    id: 'collab-05',
    code: 'ANI-VOC-05',
    name: 'Shilpa Rao',
    origin: 'Mumbai',
    releasesCount: 5,
    discipline: 'Sultry Classical & Modern Fusion Lead ("Chaleya", "Kaavaalaa")',
  },
  {
    id: 'collab-06',
    code: 'ANI-VOC-06',
    name: 'Keba Jeremiah',
    origin: 'Chennai',
    releasesCount: 28,
    discipline: 'Master Acoustic, Nylon & Heavy Electric Guitars',
  },
];

// Actual and scheduled XV World Tour & Stadium Dates
export const TOUR_DATES: TourDate[] = [
  {
    id: 'tour-01',
    date: '05 SEP',
    artist: 'Anirudh Ravichander',
    venue: 'Scotiabank Arena',
    city: 'Toronto, CA',
    program: 'XV North America Tour • Live Stadium Experience',
    status: 'SOLD OUT',
  },
  {
    id: 'tour-02',
    date: '12 SEP',
    artist: 'Anirudh Ravichander',
    venue: 'Oakland Arena',
    city: 'San Francisco, US',
    program: 'XV North America Tour • Full Electric Orchestra',
    status: 'LIMITED',
  },
  {
    id: 'tour-03',
    date: '19 SEP',
    artist: 'Anirudh Ravichander',
    venue: 'Toyota Center',
    city: 'Houston, US',
    program: 'XV North America Tour • Heavy Bass & Brass Live',
    status: 'TICKETS',
  },
  {
    id: 'tour-04',
    date: '03 OCT',
    artist: 'Anirudh Ravichander',
    venue: 'The O2 Arena',
    city: 'London, UK',
    program: 'XV World Tour • European Premiere Concert',
    status: 'LIMITED',
  },
  {
    id: 'tour-05',
    date: '17 OCT',
    artist: 'Anirudh Ravichander',
    venue: 'Singapore Indoor Stadium',
    city: 'Singapore, SG',
    program: 'XV Tour Southeast Asia • Live Mass Stage',
    status: 'TICKETS',
  },
  {
    id: 'tour-06',
    date: '08 NOV',
    artist: 'Anirudh Ravichander',
    venue: 'Jawaharlal Nehru Stadium',
    city: 'Chennai, IN',
    program: 'Hometown Homecoming • 50,000 Cap Stadium Spectacle',
    status: 'RSVP',
  },
];
