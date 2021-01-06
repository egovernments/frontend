export const deoProcessMappings = () => {
  
  const deoMappings = {

    "pb.agra": ["pb.agra","pb.mathura"],
    "pb.allahabad" : ["pb.allahabad","pb.faizabad","pb.varanasi"],
    "pb.bareilly" : ["pb.almora","pb.bareilly","pb.nainital","pb.ranikhet","pb.shahjahanpur"],
    "pb.danapur": ["pb.danapur","pb.ramgarh"],
    "pb.jabalpur":["pb.jabalpur", "pb.pachmarhi"],
    "pb.lucknow": ["pb.fatehgarh","pb.kanpur","pb.lucknow"],
    "pb.meerut": ["pb.chakrata", "pb.clementtown", "pb.dehradun","pb.landour","pb.lansdowne", "pb.meerut", "pb.roorkee"],
    "pb.mhow": ["pb.mhow"],
    "pb.shillong":["pb.shillong"],  //To be noted
    "pb.barrackpore": ["pb.barrackpore"],  //To be noted
    "pb.jalapahar" : ["pb.jalapahar","pb.lebong"],  //To be noted
    "pb.badamibagh": ["pb.badamibagh"],
    "pb.ahmedabad":["pb.ahmedabad"],
    "pb.belgaum":["pb.belgaum"],//To be noted
    "pb.babina":["pb.babina","pb.jhansi","pb.morar", "pb.saugor"], //to be noted
    "pb.stm":["pb.stm","pb.wellington"], //to be noted
    "pb.ajmer":["pb.nasirabad"]
  };

  //This attribute is being used. Dont remove this.
  const deoMappings2 = {
      "AGRA": [
        "AGRA",
        "MATHURA"
      ],
      "ALLAHABAD": [
        "ALLAHABAD",
        "FAIZABAD",
        "VARANASI"
      ],
      "BAREILLY": [
        "ALMORA",
        "BAREILLY",
        "NAINITAL",
        "RANIKHET",
        "SHAHJAHANPUR"
      ],
      "DANAPUR": [
        "DANAPUR",
        "RAMGARH"
      ],
      "JABALPUR": [
        "JABALPUR",
        "PACHMARHI"
      ],
      "LUCKNOW": [
        "FATEHGARH",
        "KANPUR",
        "LUCKNOW"
      ],
      "MEERUT": [
        "CHAKRATA",
        "CLEMENTTOWN",
        "DEHRADUN",
        "LANDOUR",
        "LANSDOWNE",
        "MEERUT",
        "ROORKEE"
      ],
      "MHOW": [
        "MHOW"
      ],
      "GUWAHATI": [
        "SHILLONG"
      ],
      "KOLKATA": [
        "BARRACKPORE"
      ],
      "SILIGURI": [
        "JALAPAHAR",
        "LEBONG"
      ],
      "KASHMIR": [
        "BADAMIBAGH"
      ],
      "AHMEDABAD": [
        "AHMEDABAD"
      ],
      "BANGALORE": [
        "BELGAUM"
      ],
      "BHOPAL": [
        "BABINA",
        "JHANSI",
        "MORAR",
        "SAUGOR"
      ],
      "CHENNAI": [
        "STM",
        "WELLINGTON"
      ],
      "COCHIN": [
        "CANNANORE"
      ],
      "JODHPUR": [
        "AJMER",
        "NASIRABAD"
      ],
      "MUMBAI": [
        "DEOLALI",
        "KAMPTEE"
      ],
      "PUNE": [
        "AHMEDNAGAR",
        "AURANGABAD",
        "DEHUROAD",
        "KIRKEE",
        "PUNE"
      ],
      "SECUNDERABAD": [
        "SECUNDERABAD"
      ],
      "AMBALA": [
        "AMBALA",
        "DAGSHAI",
        "JUTOGH",
        "KASAULI",
        "SUBATHU"
      ],
      "DELHI": [
        "DELHI"
      ],
      "JALANDHAR": [
        "AMRITSAR",
        "FEROZEPUR",
        "JALANDHAR"
      ],
      "JAMMU": [
        "JAMMU"
      ],
      "PATHANKOT": [
        "BAKLOH",
        "DALHOUSIE",
        "KHASYOL"
      ],
      "TESTING": [
        "TESTING"
      ]
    }
  
    return deoMappings2;

};

export const deoList = ["AGRA","ALLAHABAD","BAREILLY","DANAPUR","JABALPUR","LUCKNOW","MEERUT","MHOW","GUWAHATI","KOLKATA","SILIGURI","KASHMIR","AHMEDABAD","BANGALORE","BHOPAL","CHENNAI","COCHIN","JODHPUR","MUMBAI","PUNE","SECUNDERABAD","AMBALA","DELHI","JALANDHAR","JAMMU","PATHANKOT"];

export const cbToDeoMapping = {"AGRA":"AGRA","MATHURA":"AGRA","ALLAHABAD":"ALLAHABAD","FAIZABAD":"ALLAHABAD","VARANASI":"ALLAHABAD","ALMORA":"BAREILLY","BAREILLY":"BAREILLY","NAINITAL":"BAREILLY","RANIKHET":"BAREILLY","SHAHJAHANPUR":"BAREILLY","DANAPUR":"DANAPUR","RAMGARH":"DANAPUR","JABALPUR":"JABALPUR","PACHMARHI":"JABALPUR","FATEHGARH":"LUCKNOW","KANPUR":"LUCKNOW","LUCKNOW":"LUCKNOW","CHAKRATA":"MEERUT","CLEMENTTOWN":"MEERUT","DEHRADUN":"MEERUT","LANDOUR":"MEERUT","LANSDOWNE":"MEERUT","MEERUT":"MEERUT","ROORKEE":"MEERUT","MHOW":"MHOW","SHILLONG":"GUWAHATI","BARRACKPORE":"KOLKATA","JALAPAHAR":"SILIGURI","LEBONG":"SILIGURI","BADAMIBAGH":"KASHMIR","AHMEDABAD":"AHMEDABAD","BELGAUM":"BANGALORE","BABINA":"BHOPAL","JHANSI":"BHOPAL","MORAR":"BHOPAL","SAUGOR":"BHOPAL","STM":"CHENNAI","WELLINGTON":"CHENNAI","CANNANORE":"COCHIN","AJMER":"JODHPUR","NASIRABAD":"JODHPUR","DEOLALI":"MUMBAI","KAMPTEE":"MUMBAI","AHMEDNAGAR":"PUNE","AURANGABAD":"PUNE","DEHUROAD":"PUNE","KIRKEE":"PUNE","PUNE":"PUNE","SECUNDERABAD":"SECUNDERABAD","AMBALA":"AMBALA","DAGSHAI":"AMBALA","JUTOGH":"AMBALA","KASAULI":"AMBALA","SUBATHU":"AMBALA","DELHI":"DELHI","AMRITSAR":"JALANDHAR","FEROZEPUR":"JALANDHAR","JALANDHAR":"JALANDHAR","JAMMU":"JAMMU","BAKLOH":"PATHANKOT","DALHOUSIE":"PATHANKOT","KHASYOL":"PATHANKOT"};

export const cbToDeoMappingInCorrectTerms = {"pb.agra":"DEO_AGRA","pb.mathura":"DEO_AGRA","pb.allahabad":"DEO_ALLAHABAD","pb.faizabad":"DEO_ALLAHABAD","pb.varanasi":"DEO_ALLAHABAD","pb.almora":"DEO_BAREILLY","pb.bareilly":"DEO_BAREILLY","pb.nainital":"DEO_BAREILLY","pb.ranikhet":"DEO_BAREILLY","pb.shahjahanpur":"DEO_BAREILLY","pb.danapur":"DEO_DANAPUR","pb.ramgarh":"DEO_DANAPUR","pb.jabalpur":"DEO_JABALPUR","pb.pachmarhi":"DEO_JABALPUR","pb.fatehgarh":"DEO_LUCKNOW","pb.kanpur":"DEO_LUCKNOW","pb.lucknow":"DEO_LUCKNOW","pb.chakrata":"DEO_MEERUT","pb.clementtown":"DEO_MEERUT","pb.dehradun":"DEO_MEERUT","pb.landour":"DEO_MEERUT","pb.lansdowne":"DEO_MEERUT","pb.meerut":"DEO_MEERUT","pb.roorkee":"DEO_MEERUT","pb.mhow":"DEO_MHOW","pb.shillong":"DEO_GUWAHATI","pb.barrackpore":"DEO_KOLKATA","pb.jalapahar":"DEO_SILIGURI","pb.lebong":"DEO_SILIGURI","pb.badamibagh":"DEO_KASHMIR","pb.ahmedabad":"DEO_AHMEDABAD","pb.belgaum":"DEO_BANGALORE","pb.babina":"DEO_BHOPAL","pb.jhansi":"DEO_BHOPAL","pb.morar":"DEO_BHOPAL","pb.saugor":"DEO_BHOPAL","pb.stm":"DEO_CHENNAI","pb.wellington":"DEO_CHENNAI","pb.cannanore":"DEO_COCHIN","pb.ajmer":"DEO_JODHPUR","pb.nasirabad":"DEO_JODHPUR","pb.deolali":"DEO_MUMBAI","pb.kamptee":"DEO_MUMBAI","pb.ahmednagar":"DEO_PUNE","pb.aurangabad":"DEO_PUNE","pb.dehuroad":"DEO_PUNE","pb.kirkee":"DEO_PUNE","pb.pune":"DEO_PUNE","pb.secunderabad":"DEO_SECUNDERABAD","pb.ambala":"DEO_AMBALA","pb.dagshai":"DEO_AMBALA","pb.jutogh":"DEO_AMBALA","pb.kasauli":"DEO_AMBALA","pb.subathu":"DEO_AMBALA","pb.delhi":"DEO_DELHI","pb.amritsar":"DEO_JALANDHAR","pb.ferozepur":"DEO_JALANDHAR","pb.jalandhar":"DEO_JALANDHAR","pb.jammu":"DEO_JAMMU","pb.bakloh":"DEO_PATHANKOT","pb.dalhousie":"DEO_PATHANKOT","pb.khasyol":"DEO_PATHANKOT"};

export const initialDataTransformer = (dataInJson) =>{
  var s = dataInJson
  var map = {};
  for(var s2 in s)
  {
      s1 = s[s2]
      if(map[s1["Name of DEO Circle"].split(" ")[1]])
      {    	
      map[s1["Name of DEO Circle"].split(" ")[1]].push(s1["Name of Cantonment"].split(",")[1].split(" ")[1])
    }
      else
      {
          map[s1["Name of DEO Circle"].split(" ")[1]] = [];
          map[s1["Name of DEO Circle"].split(" ")[1]].push(s1["Name of Cantonment"].split(",")[1].split(" ")[1]);
      }
  }
  return map;
}

export const cbToDeoMappingTransformer = (deoMappings2) => {
  var map = {}
  for(var key in deoMappings2)
    for(i=0;i< deoMappings2[key].length; i++)
        map[deoMappings2[key][i]] = key
  return map;
}