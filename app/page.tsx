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
  } catch (error: any) {
    console.error('서버에서 카드 데이터를 가져오는 중 오류 발생:', error);
    loadingError = error.message || '카드 데이터를 불러오는 데 실패했습니다.';
  }

  // 가져온 데이터를 클라이언트 컴포넌트에 props로 전달합니다.
  return <HomePage initialCards={initialCards} loadingError={loadingError} />;
}
