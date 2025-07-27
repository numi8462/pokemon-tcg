import { supabase } from '@/lib/supabase';
import HomePage from '@/components/HomePage'; // 클라이언트 컴포넌트를 임포트합니다.

export type CardType = {
  id: number;
  imageSrc: string;
  name: string;
  type: '전기' | '물' | '풀' | '초' | '악' | '강철' | '노말' | '불' | '격투';
  rarity: number;
  ex: boolean;
};

// 이 함수가 서버에서 실행되어 데이터를 가져옵니다.
export default async function HomePageServer() {
  let initialCards: CardType[] = [];
  let loadingError: string | null = null;

  try {
    const [arceusResult, dialgaPalkiaResult] = await Promise.all([
      supabase
        .from('arceus_expansion_cards')
        .select('*')
        .order('id', { ascending: true }),
      supabase
        .from('dialga_palkia_expansion_cards')
        .select('*')
        .order('id', { ascending: true }),
    ]);

    if (arceusResult.error) throw arceusResult.error;
    if (dialgaPalkiaResult.error) throw dialgaPalkiaResult.error;

    initialCards = [
      ...(arceusResult.data || []),
      ...(dialgaPalkiaResult.data || []),
    ];
  } catch (error: unknown) {
    console.error('서버에서 카드 데이터를 가져오는 중 오류 발생:', error);

    // error의 타입을 확인하여 적절한 메시지를 설정합니다.
    if (error instanceof Error) {
      loadingError = `데이터 로딩 오류: ${error.message}`;
    } else {
      loadingError = '알 수 없는 오류가 발생했습니다.';
    }
  }

  // 가져온 데이터를 클라이언트 컴포넌트에 props로 전달합니다.
  return <HomePage initialCards={initialCards} loadingError={loadingError} />;
}
