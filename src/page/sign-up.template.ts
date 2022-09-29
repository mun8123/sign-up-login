import * as Handlebars from 'handlebars';

const template = `
    <div class="flex flex-col justify-center mx-auto w-2/4 h-screen">
      <div class="flex items-center justify-center px-10 py-12 bg-neutral-50 shadow-lg rounded-3xl">
        <form action="post" id="sign-up-form">
          <div id="required-fields">
          </div>
          <div class="pb-5">
            <button type="submit" class="w-full px-4 py-2 rounded-xl font-bold text-white bg-blue-600">회원가입</button>
          </div>
        </form>
      </div>
    </div>
`;

export default Handlebars.compile(template);
