export const IsTestUsername = {
  rule: 'kminchelle',
  test: (text: string) => text === IsTestUsername.rule,
  match: true,
  message: '테스트 아이디만 입력 가능합니다.',
};

export const IsTestPassword = {
  rule: '0lelplR',
  test: (text: string) => text === IsTestPassword.rule,
  match: true,
  message: '테스트 비밀번호만 입력 가능합니다.',
};
