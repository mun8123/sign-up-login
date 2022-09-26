import * as Handlebars from 'handlebars';

const template = `
    <div class="flex justify-between pb-5">
      <label for="{{id}}">{{label}}</label>
      <input
        class="pl-2 w-3/4 border border-solid border-gray-800 rounded-md"
        type="{{type}}"
        id="{{id}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
        {{#if required}}required{{/if}} />
    </div>
`;

export default Handlebars.compile(template);
