import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../Apis/axios";
import "./Album.css";

function AlbumBox({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="albumBox">
      <img className="albumImg" src={imageUrl} />
    </div>
  );
}

function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState<any[]>([]); // album의 타입을 명시

  useEffect(() => {
    async function getAlbum() {
      try {
        const response = await instance.get(`api/clubs/${id}/album/`);
        setAlbum(response.data.results); // results 배열을 album에 설정
      } catch (error) {
        console.log("error", error);
      }
    }
    getAlbum();
  }, []);

  return (
    <div className="meetingAlbumBox">
      <div className="wrapAlbum">
        {album.map((item, index) => (
          <AlbumBox key={index} imageUrl={item.image} />
        ))}
      </div>
    </div>
  );
}

export default Album;
