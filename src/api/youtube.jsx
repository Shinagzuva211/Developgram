const API_KEY = import.meta.env.VITE_YT_API_KEY; 
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function fetchYouTubeShorts() {
  // Random qilib qidiruv so'zlari
  const queries = [
    "programm Hackers shorts",
    "programmers shorts",
    "interesting shorts"
  ];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];

  try {
    const res = await fetch(
      `${BASE_URL}/search?part=snippet&type=video&maxResults=25&videoDuration=short&regionCode=UZ&relevanceLanguage=uz&q=${randomQuery}&key=${API_KEY}`
    );

    const data = await res.json();

    // Faqat kerakli ma'lumotlarni qaytarish
    return data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
  } catch (error) {
    console.error("YouTube API error:", error);
    return [];
  }
}
