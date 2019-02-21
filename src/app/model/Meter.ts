export interface Meter {
  id?: string;
  council_id: string;
  peek: {
    peak_date_from: number;
    peak_date_to: number;
    peak_max_time: number;
    peak_min_time: number;
    peak_rate: number;
    peak_time_from: number;
    peak_time_to: number
  }
}
