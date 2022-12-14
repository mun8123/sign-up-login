import * as Handlebars from 'handlebars';

const template = `
    <div style="min-width: 400px;" class="flex flex-col justify-center mx-auto w-2/4 h-screen">
      <div class="flex items-center justify-center px-10 py-12 bg-neutral-50 shadow-lg rounded-3xl">
        {{#if submitted}}
          <p class="text-lg">제출이 완료되었습니다.</p>
        {{else}}
          <form method="post" id="sign-up-form">
            <div id="required-fields">
            </div>
            <div id="optional-fields">
            <p class="mt-8 text-gray-300">추가 입력</p>
            </div>
            <div class="pt-8">
              <button type="submit" class="w-full px-4 py-2 rounded-xl font-bold text-white bg-blue-600">회원가입</button>
            </div>
          </form>
        {{/if}}

      </div>
    </div>
`;

export default Handlebars.compile(template);
