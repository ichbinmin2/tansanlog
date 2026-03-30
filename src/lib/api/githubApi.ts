import axios from "axios";

const BASE_URL = "https://api.github.com";
const token = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN; // 환경 변수로 GitHub Personal Access Token 관리

console.log("Initializing axios instance");

// Axios 기본 설정
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`, // 인증 헤더 추가
    Accept: "application/vnd.github.v3+json", // GitHub API 권장 헤더
  },
});

console.log("Axios instance headers:", axiosInstance.defaults.headers);

export const getCommitsByMonth = async (
  owner: string,
  repo: string,
  year: number
): Promise<{ [key: number]: number }> => {
  const months = Array.from({ length: 12 }, (_, index) => index); // 0부터 11까지 (1월~12월)
  const result: { [key: number]: number } = {};

  for (let month = 0; month < 12; month++) {
    const start = new Date(Date.UTC(year, month, 1, 0, 0, 0)).toISOString(); // 해당 월 시작 UTC
    const end = new Date(
      Date.UTC(year, month + 1, 0, 23, 59, 59)
    ).toISOString(); // 해당 월 끝 UTC

    try {
      const response = await axiosInstance.get(
        `/repos/${owner}/${repo}/commits`,
        {
          params: {
            since: start,
            until: end,
          },
        }
      );

      // GitHub API는 커밋 목록 배열을 반환하므로, 길이를 계산해 월별 커밋 수 저장
      result[month + 1] = response.data.length;
    } catch (error) {
      console.error(`Failed to fetch commits for ${year}-${month + 1}:`, error);
      result[month + 1] = 0; // 에러 발생 시 해당 월 커밋 수를 0으로 설정
    }
  }

  return result;
};
