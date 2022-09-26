import * as Handlebars from 'handlebars';

const template = `
    <div class="flex flex-col justify-center mx-auto w-2/4 h-screen">
      <div class="flex items-center justify-center px-10 py-12 bg-neutral-50 shadow-lg rounded-3xl">
        <form action="post" id="login-form" class="w-72" >
          <div class="flex justify-between pb-5">
            <label for="username-field">아이디</label>
          <input type="text" id="username-field" class="w-3/4 border border-solid border-gray-800 rounded-md" required>
          </div>
          <div class="flex justify-between pb-5">
            <label for="password-field">비밀번호</label>
            <input type="text" class="w-3/4 border border-solid border-gray-800 rounded-md" id="password-field" required>
          </div>
          <div class="h-3.5 pb-8">
            {{#if loginFail}}
              <p class="text-xs italic text-red-500 mb-5">아이디 또는 비밀번호가 잘못되었습니다.</p>
            {{/if}}
          </div>
          <div class="pb-5">
            <input type="checkbox" id="remember-login-info" />
            <label for="remember-login-info">로그인 정보 기억</label>
          </div>
          <div class="text-center">
            <div class="pb-5">
              <button type="submit" class="w-full px-4 py-2 rounded-xl font-bold text-white bg-blue-600">로그인</button>
            </div>
            <div class="pb-3">
              <a href="/#signup">회원가입</a>
            </div>
              <a href="/#lost-password">비밀번호 찾기</a>
          </div>
        </form>
      </div>
    </div>
`;

export default Handlebars.compile(template);
