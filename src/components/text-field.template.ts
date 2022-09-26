import * as Handlebars from 'handlebars';

const template = `
    <div class="flex justify-between pt-3 pb-1">
      <label for="{{id}}">{{label}}</label>
      <input
        class="pl-2 w-3/4 border border-solid border-gray-800 rounded-md"
        type="{{type}}"
        id="{{id}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
        {{#if required}}required{{/if}}
      />
      </div>
      <div class="h-3.5 pb-3">      
      {{#if isNotValid}}
        <p class="text-xs italic text-red-500">{{validateMessage}}</p>
      {{/if}}
      </div>
`;

export default Handlebars.compile(template);
