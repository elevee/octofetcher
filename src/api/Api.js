import sampleListResponse from './sampleListResponse';
import sampleDetailResponse from './sampleDetailResponse';

const testing = false;

export const callRepositories = async ({
    setIsLoading, 
    setResults, 
    url,
}) => {
    if(testing){
        const result = sampleListResponse;
        setResults(result);
        return result;
    }

    if(url){
        setIsLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setIsLoading(false);
        setResults(result);
        return result;
    }
};

export const callRepository = async ({
    id, 
    setDetailRecord,
    setIsLoading,
}) => {
    const url = `https://api.github.com/repositories/${encodeURIComponent(id)}`;
    console.log('url will be', url);

    if(testing){
        const result = sampleDetailResponse;
        setDetailRecord(result);
        return;
    }

    if(url){
        setIsLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setIsLoading(false);
        setDetailRecord(result);
        return result;
    }
};

