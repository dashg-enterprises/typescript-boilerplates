import axios from "axios"
import { dataLoaded } from "../appSlice";
import { RootDispatch, GetRootState, store } from "../store";

export const loadData = (drilldown: string, measure: string) => {
    const loadDataThunk = async (dispatch: RootDispatch, getState: GetRootState) => {
        const response = await axios.get(`https://datausa.io/api/data?drilldowns=Nation&measures=Population`);
        dispatch(dataLoaded(response.data));
    }
    return loadDataThunk;
}