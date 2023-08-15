// import login from '../apis/apis';
// import axios from 'axios'

// const testServer = "https://5a52d2d2-b3df-456a-a975-3b8bbf65f215.mock.pstmn.io";

// jest.mock('axios');
// describe('Login API', () => {
//     test('loginData 전송 및 SectionId 결과값 확인', async () => {
//         const testData = {
//             url : testServer + '/login/login',
//             userData : {
//                 id: "qwe123",
//                 pw: "123123"
//             }
//         };

//         const respData = {
//             "status":200,
//             "success":true,
//             "result": {
//                 sectionId :"test"
//             }
//         };
//         axios.post.mockImplementation(() => Promise.resolve({ data : respData}));

//         const sectionId = await login(testData);
//         expect(sectionId).toEqual("test");
//     });
// });