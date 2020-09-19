import useSWR, { ConfigInterface } from "swr";
import { useGameSettings } from "context";
import { objectToQueryParams } from "utils/strings";
import { CategoryCount, Response, Result } from "api";
import { AllHtmlEntities } from "html-entities";

interface DecodedResult extends Result {
  answers: string[];
}

const entities = new AllHtmlEntities();

const decode = (str: string) => entities.decode(str);

const decodeResult = (result: Result): DecodedResult => {
  const correct_answer = decode(result.correct_answer);
  const incorrect_answers = result.incorrect_answers.map(decode);
  const answers = [correct_answer, ...incorrect_answers];
  return {
    ...result,
    question: decode(result.question),
    correct_answer,
    incorrect_answers,
    answers,
  };
};

function useQuestionsAmount() {
  const {
    state: { category, difficulty },
  } = useGameSettings();
  const amount: number = 15;
  const { data } = useSWR<CategoryCount>(
    category ? `/api_count.php?category=${category.id}` : null
  );

  if (data) {
    const { category_question_count } = data;
    const countKey = difficulty
      ? Object.keys(category_question_count).find((key) =>
          key.includes(difficulty.id.toString())
        )
      : undefined;

    const { total_question_count } = category_question_count;

    const categoryCount = countKey
      ? // @ts-ignore
        category_question_count[countKey]
      : total_question_count;

    if (categoryCount < amount) {
      return categoryCount;
    }
  }

  return amount;
}

export function useResults(config?: ConfigInterface) {
  const { state } = useGameSettings();
  const amount = useQuestionsAmount();
  const queryString = objectToQueryParams({
    category: state.category?.id,
    difficulty: state.difficulty?.id,
    type: state.gameType?.id,
    amount,
  });

  const { data, isValidating, error } = useSWR<Response<Result>>(
    `/api.php?${queryString}`,
    {
      revalidateOnFocus: false,
      ...config,
    }
  );
  console.log(data);
  return {
    results: data ? data.results.map(decodeResult) : [],
    isValidating,
    error,
    questionsAmount: amount,
  };
}
