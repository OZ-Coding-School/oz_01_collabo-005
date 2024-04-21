//카테고리 클럽 get 요청할 때 상세목록까지
export default interface ClubSetItem {
  id: number;
  url: string;
  name: string;
  description: string;
  category: number;
  image: string;
  leader: string;
  max_members: number;
  frequent_place: string;
  age_group: number[];
  created_at: string;
  updated_at: string;
}

//카테고리 클럽 get요청 간소화
export default interface MinClub {
  id: number;
  url: string;
  name: string;
  picture: string;
  club_set: ClubSetItem[]; // ClubSetItem의 배열
}
