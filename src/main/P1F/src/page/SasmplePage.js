import React, { useEffect } from 'react';
import { getUserData } from '../apis/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setUserEmail, setUserNickName } from "../store/userData";

//리덕스 참고용 샘플페이지
const Sasmple = () => {
  //리덕스 연결
  const dispatch = useDispatch();
  const state = useSelector(state => state.userData);

  //닉네임 사용할때 이렇게 변수에 저장해 사용
  let nickName = state.userNiceName;

  //처음 페이지 랜딩 시 백엔드에 요청해서 리덕스에 닉네임, 이메일 저장
  useEffect(() => {
    let obj = getUserData(`/api/users/setting`);
    dispatch(setUserEmail(obj.email));
    dispatch(setUserNickName(obj.nickName));
  }, []);
  return (
    <div>      
      
    </div>
  );
};

export default Sasmple;