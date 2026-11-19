const API_KEY = import.meta.env.VITE_YT_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function fetchYouTubeShorts() {
  if (!API_KEY) {
    console.warn("VITE_YT_API_KEY topilmadi. .env faylini sozlang.");
    return [];
  }

  const queries = [
    "programm Hackers shorts",
    "programmers shorts",
    "interesting shorts",
    "Gwen Stacy",
  ];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];

  try {
    const res = await fetch(
      `${BASE_URL}/search?part=snippet&type=video&maxResults=25&videoDuration=short&regionCode=UZ&relevanceLanguage=uz&q=${encodeURIComponent(
        randomQuery
      )}&key=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error(`YouTube API xatosi: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data.items)) return [];

    // Faqat kerakli ma'lumotlarni qaytarish
    return data.items
      .filter((item) => item.id?.videoId)
      .map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail:
          item.snippet.thumbnails?.medium?.url ??
          `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg`,
      }));
  } catch (error) {
    console.error("YouTube API error:", error);
    return [];
  }
}
