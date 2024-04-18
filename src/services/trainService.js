import axios from 'axios'
const TRAIN_BASE_REST_API_URL = 'http://localhost:8080/api/v1/train';
class TrainService{

    getAllTrain(){
        return axios.get(TRAIN_BASE_REST_API_URL)
    } 
    getAllTrainByTrainLine(idTrain){
        return axios.get(TRAIN_BASE_REST_API_URL+'/trainbyidtrainline?idTrainLine='+idTrain)
    }
    getTrainById(id){
        return axios.get(TRAIN_BASE_REST_API_URL+"/train?id="+id)
    }
    createTrain(newTrain){
        return axios.post(TRAIN_BASE_REST_API_URL+"/inserttrain", newTrain)
    }
    updateTrain(id, train){
        return axios.put(TRAIN_BASE_REST_API_URL+"/updatetrain?id="+id, train)
    }
    deleteTrain(id){
        return axios.delete(TRAIN_BASE_REST_API_URL+"/deletetrain?id="+id)
    }
}

// eslint-disable-next-line
export default new TrainService()