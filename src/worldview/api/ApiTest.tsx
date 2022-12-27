// To make a new static request (ie. you know the exact URL of your request) just add it to the apiConfig.tsx file as a new object with a title, description and url field
// at the end of the array.
// To make custom requests (ie. dynamically setting url parameters with a function) do the following:
//  1. Create a new file in the customRequests directory 
//  2. Define and export your logic from the new file. !!Make sure to pass setResponse as an arguement to your function.
//  3. In apiConfig.ts, add a new object to the end of the array with properties of title, description, url and customReference. Make sure the customReference is unique.
//  4. Import your custom request function.
//  5. Add a new case to the switch statement that refers to the customReference value you created in apiConfig.ts 
import React, { useState, useEffect } from "react"
import { Box, Button, Flex, IconButton, Heading, List, ListItem, Text, Icon, Spinner, Spacer, Select } from "@chakra-ui/react";
import axios from "axios"
import { PhoneIcon, InfoIcon } from '@chakra-ui/icons';
import { GiSave, GiMaterialsScience } from 'react-icons/gi'
import { GoGlobe } from 'react-icons/go'
import "../map/Map.css"
import { apiCalls } from "./apiConfig";
import { 
    testResponseOneData, 
    testResponseTwoData,
    testResponseThreeData
} from './dataTestingFunctions';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setOpenStreetLayerResponse, setOpenStreetRequestLocation } from '../../slices/worldview/worldviewSlice';
// Import any custom request files you make here
import findDatesWithinTimeframe from './customRequests/findDates';
import registerSearch from "./customRequests/registerSearch";
import hurricaneIdaSWIR from './customRequests/hurricaneIdaSWIR';
import hurricaneIdaColor from './customRequests/hurricaneIdaColor';
import hurricaneMariaL30 from './customRequests/hurricaneMariaL30';

const ApiTest = () => {
    const [customReference, setCustomReference] = useState();
    const [responseOne, setResponseOne] = useState();
    const [responseTwo, setResponseTwo] = useState();
    const [responseThree, setResponseThree] = useState();
    const [callUrlOne, setCallUrlOne] = useState();
    const [callTitleOne, setCallTitleOne] = useState();
    const [callDescriptionOne, setCallDescriptionOne] = useState();
    const [callOneApplyToMap, setCallOneApplyToMap] = useState(false);
    const [callUrlTwo, setCallUrlTwo] = useState();
    const [callTitleTwo, setCallTitleTwo] = useState();
    const [callDescriptionTwo, setCallDescriptionTwo] = useState();
    const [callTwoApplyToMap, setCallTwoApplyToMap] = useState(false);
    const [callUrlThree, setCallUrlThree] = useState();
    const [callTitleThree, setCallTitleThree] = useState();
    const [callDescriptionThree, setCallDescriptionThree] = useState();
    const [callThreeApplyToMap, setCallThreeApplyToMap] = useState(false);
    const [loadingOne, setLoadingOne] = useState(false);
    const [loadingTwo, setLoadingTwo] = useState(false);
    const [loadingThree, setLoadingThree] = useState(false);
    const [locationRequest, setLocationRequest] = useState()

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!locationRequest) return;

        dispatch(setOpenStreetRequestLocation(locationRequest));
    }, [locationRequest])


    const customRequestHandler = (setResponse, setLoading, responseId) => {
        // Make a new case that refers to the customReference value you created in apiConfig.tsx and make sure to pass it setResponse as an argument.
        switch (customReference){
            case '1':
                setLoading(true);
                findDatesWithinTimeframe(setResponse, setLoading, responseId);
                break;
            case '2':
                setLoading(true);
                registerSearch(setResponse, setLoading, responseId);
                break;
            case '3':
                setLoading(true);
                hurricaneIdaSWIR(setResponse, setLoading, responseId, setLocationRequest);
                break;
            case '4':
                setLoading(true);
                hurricaneIdaColor(setResponse, setLoading, responseId, setLocationRequest);
                break;
            case '5':
                setLoading(true);
                hurricaneMariaL30(setResponse, setLoading, responseId, setLocationRequest);
                break;
            case 'default':
                console.log('Invalid reference. Make sure to include a unique customReference in the apiConfig file and make a case in the switch statement.');
        }
    }

    async function getResponseOne() {
        if(callUrlOne === "customRequest"){
            customRequestHandler(setResponseOne, setLoadingOne, "Response one");
            return;
        }
        setLoadingOne(true)
        try {
          const response = await axios.get(callUrlOne);
          const data = response.data;
          setResponseOne(data);
        } catch (error) {
          console.error(error);
        } finally {
            setLoadingOne(false);
            console.log(`Response one fetch complete. Use console to see results.`)
        }
      }

      async function getResponseTwo() {
        if(callUrlTwo === "customRequest"){
            customRequestHandler(setResponseTwo, setLoadingTwo, "Response two");
            return;
        }
        setLoadingTwo(true);
        try {
          const response = await axios.get(callUrlTwo);
          const data = response.data;
          setResponseTwo(data);
        } catch (error) {
          console.error(error);
        } finally {
            setLoadingTwo(false);
            console.log(`Response two fetch complete. Use console to see results.`)
        }
      }

      async function getResponseThree() {     
        if(callUrlThree === "customRequest"){
            customRequestHandler(setResponseThree, setLoadingThree, "Response three");
            return;
        }
        setLoadingThree(true)
        try {
          const response = await axios.get(callUrlThree);
          const data = response.data;
          setResponseThree(data);
        } catch (error) {
          console.error(error);
        } finally {
            setLoadingThree(false);
            console.log(`Response three fetch complete. Use console to see results.`)
        }
      }

      const consoleResponse = (e) => {
        if(e.target.id == "button1"){
            console.log(responseOne);
        } else if(e.target.id == "button2"){
            console.log(responseTwo);
        } else if(e.target.id == "button3"){
            console.log(responseThree);
        }
      }

      const handleSelect = (e) => {
        if(!e.target.value) return
        const value = JSON.parse(e.target.value)
        setCustomReference(value.customReference)
        if(e.target.id == "select1"){
            setCallTitleOne(value.title)
            setCallDescriptionOne(value.description)
            setCallUrlOne(value.url)
            setCallOneApplyToMap(value.applyToMap)
        } else if (e.target.id == "select2"){
            setCallTitleTwo(value.title)
            setCallDescriptionTwo(value.description)
            setCallUrlTwo(value.url)
            setCallTwoApplyToMap(value.applyToMap)
        } else if (e.target.id == "select3") {
            setCallTitleThree(value.title)
            setCallDescriptionThree(value.description)
            setCallUrlThree(value.url)
            setCallThreeApplyToMap(value.applyToMap)
        }
      }

      const saveToLocalStorage = (e) => {
        if(e.target.id == "save1"){
            localStorage.setItem('response1', JSON.stringify(responseOne));
            console.log("Response 1 saved to local storage.")
        } else if (e.target.id == "save2"){
            localStorage.setItem('response2', JSON.stringify(responseTwo));
            console.log("Response 2 saved to local storage.")
        } else if (e.target.id == "save3") {
            localStorage.setItem('response3', JSON.stringify(responseThree));
            console.log("Response 3 saved to local storage.")
        }
      }

      const fetchLocalStorage = (e) => {
        if(e.target.id == "test1"){
            const lsData = localStorage.getItem('response1');
            if(!lsData){console.log('No data found in local storage for response 1.')}
            const response = JSON.parse(lsData);
            testResponseOneData(response);
        } else if (e.target.id == "test2"){
            const lsData = localStorage.getItem('response2');
            if(!lsData){console.log('No data found in local storage for response 2.')}
            const response = JSON.parse(lsData);
            testResponseTwoData(response);
        } else if (e.target.id == "test3") {
            const lsData = localStorage.getItem('response3');
            if(!lsData){console.log('No data found in local storage for response 3.')}
            const response = JSON.parse(lsData);
            testResponseThreeData(response);
        }
      }

      const handleAddToOpenStreetMap = (e) => {
        if(e.target.id == "map1"){
            dispatch(setOpenStreetLayerResponse(responseOne))
        } else if (e.target.id == "map2"){
            dispatch(setOpenStreetLayerResponse(responseTwo))
        } else if (e.target.id == "map3"){
            dispatch(setOpenStreetLayerResponse(responseThree))
        }
      }

      const testFunction = () => {
        console.log(callUrlOne)
        console.log(responseOne)
      }
        
    return (
        <>
        {/* <Button onClick={testFunction}>Test</Button> */}
        <Flex justify="space-around" align="center" my="2">
            <Button 
            aria-label="fetch" 
            colorScheme='teal'
            size='lg'
            onClick={getResponseOne}
            isLoading={loadingOne}
            isDisabled={!callUrlOne}
            >
                <PhoneIcon mr="2" /> Fetch
            </Button>
            <Button 
            aria-label="fetch" 
            colorScheme='red'
            size='lg'
            onClick={getResponseTwo}
            isLoading={loadingTwo}
            isDisabled={!callUrlTwo}
            >
                <PhoneIcon mr="2" /> Fetch
            </Button>
            <Button 
            aria-label="fetch" 
            colorScheme='blue'
            size='lg'
            onClick={getResponseThree}
            isLoading={loadingThree}
            isDisabled={!callUrlThree}
            >
                <PhoneIcon mr="2" /> Fetch
            </Button>
        </Flex>
        <Flex w="100%" bg="gray.100" h="300px"> 
            <Flex align="center" direction="column" h="100%" w="33%" border="2px solid black" className="text-container">
                <Select defaultValue="disabled" id="select1" bg="teal.300" borderRadius="0" textAlign="center" fontWeight="bold" onChange={(e) => handleSelect(e)}>
                    <option value="disabled" disabled>Select an API Request</option>
                    {apiCalls.map((call) => {
                        return (
                        <option key={call.title} value={ JSON.stringify({url: call.url, description: call.description, title: call.title, customReference: call.customReference, applyToMap: call.applyToMap})}>{call.title}</option>
                        )
                    })}
                </Select>
                <Heading textAlign="center" size='md' my="2" maxWidth="320px">{callTitleOne}</Heading>
                <Text align="center" fontSize="sm" my="2" maxWidth="320px">{callDescriptionOne}</Text>
                <Text align="center" fontSize="sm" my="2" maxWidth="320px">{callUrlOne}</Text>
            </Flex>
            <Flex align="center" direction="column" h="100%" w="33%" border="2px solid black">
                <Select defaultValue="disabled" id="select2" bg="teal.300" borderRadius="0" textAlign="center" fontWeight="bold" onChange={(e) => handleSelect(e)}>
                    <option value="disabled" disabled>Select an API Request</option>
                    {apiCalls.map((call) => {
                        return (
                        <option key={call.title} value={ JSON.stringify({url: call.url, description: call.description, title: call.title, customReference: call.customReference, applyToMap: call.applyToMap})}>{call.title}</option>
                        )
                    })}
                </Select>
                <Heading textAlign="center" size='md' my="2" maxWidth="320px">{callTitleTwo}</Heading>
                <Text align="center" my="2" maxWidth="320px">{callDescriptionTwo}</Text>
                <Text align="center" my="2" maxWidth="320px">{callUrlTwo}</Text>
            </Flex>
            <Flex align="center" direction="column" h="100%" w="34%" border="2px solid black">
                <Select defaultValue="disabled" id="select3" bg="teal.300" borderRadius="0" textAlign="center" fontWeight="bold" onChange={(e) => handleSelect(e)}>
                    <option value="disabled" disabled>Select an API Request</option>
                    {apiCalls.map((call) => {
                        return (
                        <option key={call.title} value={ JSON.stringify({url: call.url, description: call.description, title: call.title, customReference: call.customReference, applyToMap: call.applyToMap})}>{call.title}</option>
                        )
                    })}
                </Select>
                <Heading textAlign="center" size='md' my="2" maxWidth="320px">{callTitleThree}</Heading>
                <Text align="center" my="2" maxWidth="320px">{callDescriptionThree}</Text>
                <Text align="center" my="2" maxWidth="320px">{callUrlThree}</Text>
            </Flex>
        </Flex>
        <Flex justify="space-around" align="center" my="2">
            <Flex>
                <Flex direction="column">
                    <Button 
                    aria-label="fetch" 
                    colorScheme='teal'
                    size='lg'
                    onClick={(e) => consoleResponse(e)}
                    id="button1"
                    isLoading={loadingOne}
                    disabled={!responseOne}
                    mb="2"
                    >
                        <InfoIcon className="iconButton" /> Console
                    </Button>
                    <Button
                    aria-label="save"
                    colorScheme='teal'
                    size='lg'
                    isDisabled={!responseOne}
                    id="save1"
                    onClick={(e) => saveToLocalStorage(e)}
                    isLoading={loadingOne}
                    >
                        <GiSave className="iconButton" /> Save
                    </Button>
                </Flex>
                <Flex direction="column" ml="1" mr="1">
                    <Button 
                    aria-label="test data" 
                    colorScheme='teal'
                    size='lg'
                    onClick={(e) => fetchLocalStorage(e)}
                    id="test1"
                    isLoading={loadingOne}
                    mb="2"
                    >
                        <GiMaterialsScience className="iconButton" /> Test Data
                    </Button>
                    <Button 
                    aria-label="apply to map" 
                    colorScheme='teal'
                    size='lg'
                    id="map1"
                    isLoading={loadingOne}
                    onClick={(e) => handleAddToOpenStreetMap(e)}
                    isDisabled={!callOneApplyToMap || !responseOne}
                    mb="2"
                    >
                        <GoGlobe className="iconButton" /> Apply To Map
                    </Button>
                </Flex>
            </Flex>
            <Flex>
            <Flex direction="column">
                <Button 
                aria-label="console" 
                colorScheme='red'
                size='lg'
                onClick={(e) => consoleResponse(e)}
                id="button2"
                isLoading={loadingTwo}
                disabled={!responseTwo}
                mb="2"
                >
                    <InfoIcon className="iconButton"/> Console
                </Button>
                <Button
                aria-label="save"
                colorScheme='red'
                size='lg'
                disabled={!responseTwo}
                id="save2"
                onClick={(e) => saveToLocalStorage(e)}
                isLoading={loadingTwo}
                >
                    <GiSave className="iconButton" /> Save 
                </Button>
            </Flex>
            <Flex direction="column" ml="1" mr="1">
                <Button 
                aria-label="test data" 
                colorScheme='red'
                size='lg'
                onClick={(e) => fetchLocalStorage(e)}
                id="test2"
                isLoading={loadingTwo}
                mb="2"
                >
                    <GiMaterialsScience className="iconButton" /> Test Data
                </Button>
                <Button 
                aria-label="apply to map" 
                colorScheme='red'
                size='lg'
                id="map2"
                isLoading={loadingTwo}
                onClick={(e) => handleAddToOpenStreetMap(e)}
                isDisabled={!callTwoApplyToMap || !responseTwo}
                mb="2"
                >
                    <GoGlobe className="iconButton" /> Apply To Map
                </Button>
                </Flex>
            </Flex>
            <Flex>
            <Flex direction="column">
                <Button 
                aria-label="fetch" 
                colorScheme='blue'
                size='lg'
                onClick={(e) => consoleResponse(e)}
                id="button3"
                isLoading={loadingThree}
                disabled={!responseThree}
                mb="2"
                >
                    <InfoIcon className="iconButton"/> Console
                </Button>
                <Button
                aria-label="save"
                colorScheme='blue'
                size='lg'
                isDisabled={!responseThree}
                id="save3"
                onClick={(e) => saveToLocalStorage(e)}
                isLoading={loadingThree}
                >
                    <GiSave className="iconButton" /> Save
                </Button>
            </Flex>
            <Flex direction="column" ml="1">
                <Button 
                aria-label="test data" 
                colorScheme='blue'
                size='lg'
                onClick={(e) => fetchLocalStorage(e)}
                id="test3"
                isLoading={loadingThree}
                mb="2"
                >
                    <GiMaterialsScience className="iconButton" /> Test Data
                </Button>
                <Button 
                aria-label="apply to map" 
                colorScheme='blue'
                size='lg'
                id="map3"
                isLoading={loadingThree}
                mb="2"
                onClick={(e) => handleAddToOpenStreetMap(e)}
                isDisabled={!callThreeApplyToMap || !responseThree}
                >
                    <GoGlobe className="iconButton" /> Apply To Map
                </Button>
                </Flex>
            </Flex>
        </Flex>
        </>
    )
}

export default ApiTest;