export interface tgdbGame {
  id: number;
  game_title: string;
  release_date?: string | null;
  platform: number;
  players?: number | null;
  overview?: string | null;
  last_updated?: string | null;
  rating?: string | null;
  coop?: string | null;
  youtube?: string | null;
  developers?: string[] | null;
  genres?: string[] | null;
  publishers?: string[] | null;
  alternates?: string[] | null;
}

export interface tgdbGetGameById {
  code: number;
  status: string;
  data: {
    count: number;
    games: tgdbGame[];
  };
  include: {
    boxart: {
      base_url: any[];
      data: any[];
    },
    platform: {
      data: any[]
    }
  };
  pages: {
    previous: string | null;
    current: string;
    next: string | null;
  }
  remaining_monthly_allowance: number;
  extra_allowance: number;
  allowance_refresh_timer: null;
}

export interface tgdbPlatforms {
  id: number;
  name: string;
  alias: string | null;
}

export interface tgdbPages {
  previous: string | null;
  current: string | null;
  next: string | null;
}
