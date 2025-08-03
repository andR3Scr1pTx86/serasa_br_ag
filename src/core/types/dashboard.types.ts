export interface DashboardData {
    total_farms: number
    total_farms_by_state: Record<string, number>
    total_farms_by_planted_crop:Record<string, number>
    total_farms_area_ha: number,
    total_farms_arable_area_ha: number,
    total_farms_vegetation_area_ha: number,
}