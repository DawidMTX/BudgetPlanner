import { useAppSelector } from "@/store/store";

export const getChartData = () => {
    const summariseAll = 0
    const allExpensesData = useAppSelector(state =>state.manageData.allExpensesData );

    

}

