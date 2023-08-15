import React from 'react';
import { connectTodoData, getUserData } from "../apis/apis";

// 백엔드에서 데이터 추가
const addTodoBack = (obj) => {
  connectTodoData(`/api/todos/item`, "add", obj);
}
// 백엔드에서 데이터 수정
const modifyTodoBack = (obj) => {
  connectTodoData(`/api/todos/item`, "modify", obj);
}
// 백엔드에서 데이터 삭제
const delTodoBack = (tdid) => {
  connectTodoData(`/api/todos/item/${tdid}`, "del");
}

export { addTodoBack, delTodoBack, modifyTodoBack };