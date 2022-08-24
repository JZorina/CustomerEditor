export const validateAmericanEIN = (value:string, state:string) => {
    let ein_splitted = value.split('-');
    let inputState = state ? state.toLowerCase().trim() : null;
    if(inputState){
        return Object.keys(states).includes(inputState) &&  states[inputState].includes(ein_splitted[0]);
    }
    return false;
}
const states:any = {
   'massachusetts':['10','12'],
    'andover':['10','12'],
    'atlanta':['60', '67'],
    'austin':['50', '53'],
    'newyork':['01', '02', '03', '04', '05', '06', '11', '13', '14', '16', '21', '22', '23', '25', '34', '51', '52', '54', '55', '56', '57', '58', '59', '65'],
    'brookhaven':['01', '02', '03', '04', '05', '06', '11', '13', '14', '16', '21', '22', '23', '25', '34', '51', '52', '54', '55', '56', '57', '58', '59', '65'],
    'cincinnati':['30', '32', '35', '36', '37', '38', '61'],
    'fresno':['15', '24'],
    'kansascity':['40', '44'],
    'memphis':['94', '95'],
    'utah':['80', '90'],
    'ogden':['80', '90'],
    'philadelphia':['33', '39', '41', '42', '43', '48', '62', '63', '64', '66', '68', '71', '72', '73', '74', '75', '76', '77', '82', '83', '84', '85', '86', '87', '88', '91', '92', '93', '98', '99'],
    'internet':['20', '26', '27', '45', '46', '47', '81'],
    'sba':['31']
}