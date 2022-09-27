import * as Handlebars from 'handlebars';

const template = `
    <div class="flex flex-col justify-center mx-auto w-2/4 h-screen">
      <div class="flex items-center justify-center px-10 py-12 bg-neutral-50 shadow-lg rounded-3xl">
        <form action="post" id="login-form" class="w-72" >
          <div id="login-field"></div>
          <div class="h-3.5 mt-5 mb-3">
            {{#if loginFail}}
              <p class="text-xs italic text-red-500">로그인을 다시 시도해주세요.</p>
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
