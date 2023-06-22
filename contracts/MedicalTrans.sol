// SPDX-License-Identifier: MIT

 pragma solidity >=0.4.21 <0.8.20;

contract MedicalTrans {
  address sender;
  string fullname;
  string age;
  string medicaldata;
  string medicaldataExp;
  string keyN;
  string results;
  string rExpo; 
  
        function sendMedicalData(string memory _fullname,string memory aGe,string memory data,string memory _medicaldataExp,string memory _keyN) public {

          sender = msg.sender;
          fullname = _fullname;
          age = aGe;
          medicaldata = data;
          medicaldataExp= _medicaldataExp; 
          keyN =_keyN;
            }   

        function getMedicalData() public view  returns(
                  address _snder, string memory _fullname,string memory _age,string memory _medicaldata,string memory _medicaldataExp,string memory _keyN){
        return(sender ,fullname,age,medicaldata,medicaldataExp,keyN);
     }
     



 
  function sendResults(string memory _results,string memory _rExpo) public {

          sender = msg.sender;
          results = _results;
          rExpo = _rExpo;
          }   
  function getResults() public view  returns(
    address _snder, string memory _results ,string memory _rExpo){
    return(sender ,results,rExpo);
     }
     







}