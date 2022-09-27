import * as Handlebars from 'handlebars';

const template = `
    <div class="flex flex-col justify-center mx-auto w-2/4 h-screen">
      <div class="flex items-center justify-center px-10 py-12 bg-neutral-50 shadow-lg rounded-3xl">
          <div class="w-20 rounded-full overflow-hidden shadow-lg border-2 border-solid border-blue-600">
            <img src={{image}} alt="프로필 사진"/>
          </div>
          <div class="px-10">
            <p>{{firstName}} {{lastName}}</p>
            <p>{{phone}}</p>
            <p>{{email}}</p>
          </div>
      </div>
    </div>
`;

export default Handlebars.compile(template);
