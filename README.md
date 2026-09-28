# relay-v2-test

[relay-v2](https://github.com/CheongMyungJ/relay-v2)의 GitHub 연동을 실제 GitHub에서 시험하는 레포다. 스파이크 S7과 PR 진행(M9~M11)의 [실제] 시험이 여기에 브랜치와 PR을 만들고, 코멘트를 달고, 머지한다. 실제 작업에는 쓰지 않는다.

공개 레포로 둔다. 비공개 레포에는 협업자만 코멘트할 수 있어, 협업자가 아닌 계정의 코멘트(relay-v2 설계 D160)를 시험할 수 없다.

## 들어 있는 것

| 경로 | 쓰임 |
|---|---|
| `src/cart.mjs`, `test/cart.test.mjs` | 시험 대상 코드와 테스트. [실제] 시험이 여기에 버그를 심고 relay가 고치게 한다. 테스트 명령은 `npm test`(Node 22 이상) |
| `.github/workflows/ci.yml` | PR과 `main` push마다 `npm test`를 돌린다. 아래 스위치로 일부러 실패시킬 수 있다 |
| `.github/workflows/bot-comment.yml` | github-actions[bot] 이름으로 PR에 코멘트를 단다(봇 코멘트, 설계 D161) |

### CI 스위치

브랜치에 파일을 더하면 켜지고, 지우면 꺼진다. 파일 내용은 비어 있어도 된다.

| 파일 | 동작 | 쓰임 |
|---|---|---|
| `ci-fail` | CI가 늘 실패한다 | 실패한 체크와 그 로그 읽기 |
| `ci-flaky` | 첫 시도만 실패한다. 실패한 작업을 다시 실행하면 통과한다 | [실패한 체크 다시 실행] (설계 D175) |

### 봇 코멘트

```
gh workflow run bot-comment.yml -R CheongMyungJ/relay-v2-test -f pr=<번호>                 # 대화 코멘트
gh workflow run bot-comment.yml -R CheongMyungJ/relay-v2-test -f pr=<번호> -f kind=review  # 리뷰 본문과 인라인 코멘트 하나
```

`-f body=<본문>`으로 본문을 바꾼다. 인라인 코멘트는 PR에서 처음 더한 줄에 단다.

## 토큰

자동 시험은 relay-v2 레포의 Actions secret으로 이 레포 이름과 토큰을 받는다(`RELAY_TEST_GH_REPO`, `RELAY_TEST_GH_TOKEN`, relay-v2 `docs/implementation.md` I43). 토큰은 이 레포 하나에만 권한이 있는 fine-grained personal access token이다.

| 권한 | 수준 | 쓰임 |
|---|---|---|
| Contents | Read and write | 브랜치 push, 머지, 브랜치 삭제 |
| Pull requests | Read and write | PR 만들기, 리뷰 코멘트 읽기와 답글 |
| Issues | Read and write | PR 대화 코멘트 읽기와 쓰기 |
| Actions | Read and write | 실패 로그 읽기, 실패한 작업 다시 실행, 봇 코멘트 워크플로 실행 |
| Commit statuses | Read-only | Actions 밖 CI의 상태 |
| Administration | Read-only | 레포가 허용하는 머지 방식 읽기 |
| Metadata | Read-only | 자동으로 들어감 |

모자라거나 남는 권한은 스파이크 S7에서 확인해 relay-v2 `docs/spikes.md`의 S7 결과에 적는다. 시험은 워크플로 파일을 바꾸지 않으므로 Workflows 권한은 주지 않는다.

## 규칙

- 시험이 만든 브랜치와 PR은 그 시험이 끝날 때 정리한다.
- `main`에는 브랜치 보호를 걸지 않는다. S7이 충돌을 만들려고 `main`에 직접 push한다.
