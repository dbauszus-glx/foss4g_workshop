const L = require('./leaflet-src');

const map = L.map('map', {
    renderer: L.svg(),
    scrollWheelZoom: true,
    //maxBounds: L.latLngBounds(L.latLng(30, -25), L.latLng(72, 47)),
    minZoom: 6,
    maxZoom: 15
}).setView([54, -2], 6);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png').addTo(map);
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png',{pane: 'labels'}).addTo(map);

// map.createPane('grid');
// map.getPane('grid').style.zIndex = 550;
// map.getPane('grid').style.pointerEvents = 'none';

function dot(colorB, colorT) {
    //return 'data:image/svg+xml,' + window.btoa('<svg width="866px" height="1000px" xmlns="http://www.w3.org/2000/svg"><metadata id="metadata1">image/svg+xml</metadata><circle fill="' + colorT + '" cx="466" cy="532" r="395"/><circle fill="' + colorB + '" cx="400" cy="468" r="395"/></svg>');//.replace('#','%23');

    //return encodeURI('data:image/svg+xml, <svg width="866px" height="1000px" xmlns="http://www.w3.org/2000/svg"><metadata id="metadata1">image/svg+xml</metadata><circle fill="' + colorT + '" cx="466" cy="532" r="395"/><circle fill="' + colorB + '" cx="400" cy="468" r="395"/></svg>');//.replace('#','%23');

    // return encodeURI("data:image/svg+xml;utf8, <svg width='866px' height='1000px' xmlns='http://www.w3.org/2000/svg'><metadata id='metadata1'>image/svg+xml</metadata><circle fill='" + colorT + "' cx='466' cy='532' r='395'/><circle fill='" + colorB + "' cx='400' cy='468' r='395'/></svg>");

    return "data:image/svg+xml,%3Csvg%20width%3D%27866%27%20height%3D%271000%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Ccircle%20fill%3D%27%231b7540%27%20cx%3D%27466%27%20cy%3D%27532%27%20r%3D%27395%27/%3E%3Ccircle%20fill%3D%27%231a9850%27%20cx%3D%27400%27%20cy%3D%27468%27%20r%3D%27395%27/%3E%3C/svg%3E";

}

const layerGrid = {
    map: map,
    pane: 'grid',
    queryID: 'qid',
    arrayStyle: [
        dot('#1a9850','#1b7540'), //0
        dot('#66bd63','#1a9850'), //1
        dot('#a6d96a','#66bd63'), //2
        dot('#d9ef8b','#a6d96a'), //3
        dot('#ffffbf','#fee08b'), //4
        dot('#fee08b','#fdae61'), //5
        dot('#fdae61','#f46d43'), //6
        dot('#f46d43','#d73027'), //7
        dot('#d73027','#a02620'), //8
        dot('fill:#ffffff;fill-opacity:0.1','fill:#000000;fill-opacity:0.1')
    ],
    queryCount: 'pop__01',
    queryValue: 'pop__01',
    queryFields: {
        pop__01: 'Population 2001',
        pop__11: 'Population 2011',
        gen_female__11: 'Female population',
        gen_male__11: 'Male population',
        age_05to07__11: 'Age 5 to 7',
        age_08to09__11: 'Age 8 to 9',
        age_10to14__11: 'Age 10 to 14',
        age_15__11: 'Age 15',
        age_16pl__11: 'Age 16 and above',
        age_16to17__11: 'Age 16 to 17',
        age_16to74__11: 'Age 16 to 74',
        age_18to19__11: 'Age 18 to 19',
        age_20to24__11: 'Age 20 to 24',
        age_25to29__11: 'Age 25 to 29',
        age_30to44__11: 'Age 30 to 44',
        age_45to59__11: 'Age 45 to 59',
        age_60to64__11: 'Age 60 to 64',
        age_65to74__11: 'Age 65 to 74',
        age_75to84__11: 'Age 75 to 84',
        age_85to89__11: 'Age 85 to 89',
        age_90pl__11: 'Age 90 and above',
        edu_na__11: 'Highest level of education not stated or not applicable',
        edu_primary_i1__11: 'Primary education (IESCD 1)',
        edu_secondary_i2__11: 'Secondary education (IESCD 2)',
        edu_secondary_i2_l__11: 'Secondary education lower level (IESCD 2)',
        edu_secondary_i3__11: 'Secondary education upper level (IESCD 3)',
        edu_secondary_i3v__11: 'Secondary education vocational apprenticeship (IESCD 3)',
        edu_tertiary_i6__11: 'Tertiary education with a Bachelor degree or equivalent (IESCD 6)',
        ski_ab__11: 'AB Higher and intermediate managerial/administrative or professional',
        ski_c1__11: 'C1 Supervisory or clerical or junior managerial or administrative or professional',
        ski_c2__11: 'C2 Skilled manual workers',
        ski_de__11: 'DE Semi skilled and unskilled manual workers  or on state benefit unemployed',
        ski_hrp_base__11: 'Household Spaces with an Household Reference Person aged 16 to 64',
        ski_nssec_1_1__11: 'Skill NSSEC 1_1 Large employers and higher managerial and administrative occupations',
        ski_nssec_1_2__11: 'Skill NSSEC 1_2 Higher professional occupations',
        ski_nssec_2__11: 'Skill NSSEC 2 Lower managerial administrative and professional occupations',
        ski_nssec_3__11: 'Skill NSSEC 3 Intermediate occupations',
        ski_nssec_4__11: 'Skill NSSEC 4 Small employers and own account workers',
        ski_nssec_5__11: 'Skill NSSEC 5 Lower supervisory and technical occupations',
        ski_nssec_6__11: 'Skill NSSEC 6 Semi-routine occupations',
        ski_nssec_7__11: 'Skill NSSEC 7 Routine occupations',
        ski_nssec_l14_1__11: 'Skill NSSEC L14_1 Never worked',
        ski_nssec_l14_2__11: 'Skill NSSEC L14_2 Long-term unemployed',
        ski_nssec_na__11: 'Skill NSSEC Not classified',
        eac_employed__11: 'Economically active: Employed',
        eac_employed_b__11: 'Economically active: Employed base',
        eac_employed_self__11: 'Economically active: Self employed',
        eac_full_time__11: 'Economically active: Working full time',
        eac_in_accom_food__11: 'Economically active: Accommodation and food service (SOC I)',
        eac_in_admin_serv__11: 'Economically active: Administrative and support service activities (SOC N)',
        eac_in_aggriculture__11: 'Economically active: Agriculture forestry or fishing industries (SOC A)',
        eac_in_construction__11: 'Economically active: Construction industry (SOC F)',
        eac_in_education__11: 'Economically active: Eduction (SOC P)',
        eac_in_extractive__11: 'Economically active: Extractive industries including mining and quarrying (SOC B)',
        eac_in_finance__11: 'Economically active: Financial and insurance industries (SOC K)',
        eac_in_health__11: 'Economically active: Human health and social work activities (SOC Q)',
        eac_in_ict__11: 'Economically active: Information and communication technologies industry (SOC J)',
        eac_in_manufacturing_2__11: 'Economically active: Manufacturing (SOC C)',
        eac_in_other__11: 'Economically active: Other services and industries (SOC R|S|T|U)',
        eac_in_power__11: 'Economically active: Electricity gas steam and air conditioning supply (SOC D)',
        eac_in_prof_tech__11: 'Economically active: Professional scientific and technical activitiess (SOC M)',
        eac_in_property__11: 'Economically active: Property and real estate industries (SOC L)',
        eac_in_public_admin__11: 'Economically active: Public administration and defence compulsory social security (SOC O)',
        eac_in_retail__11: 'Economically active: Wholesale and retail trade repair of motor vehicles (SOC G)',
        eac_in_transport__11: 'Economically active: Transport and Storage (SOC H)',
        eac_in_waste__11: 'Economically active: Water supply sewerage waste management and remediation activities (SOC E)',
        eac_part_time__11: 'Economically active: Working part time',
        eac_student__11: 'Economically active: Full-time student',
        eac_student_18to74_empl__11: 'Economically active: Full-time student (employed)',
        eac_student_18to74_unempl__11: 'Economically active: Full-time student (unemployed)',
        eac_tr_bike__11: 'Economically active: Travel to work by bike',
        eac_tr_bus__11: 'Economically active: Travel to work by bus',
        eac_tr_car__11: 'Economically active: Travel to work by car',
        eac_tr_carpass__11: 'Economically active: Travel to work by car (including car pool)',
        eac_tr_foot__11: 'Economically active: Travel to work by foot',
        eac_tr_mbike__11: 'Economically active: Travel to work by motorcycle',
        eac_tr_none__11: 'Economically active: No travel to work',
        eac_tr_other__11: 'Economically active: Travel to work by other mode',
        eac_tr_taxi__11: 'Economically active: Travel to work by taxi',
        eac_tr_train__11: 'Economically active: Travel to work by train',
        eac_tr_tube__11: 'Economically active: Travel to work by metro system',
        eac_unemployed__11: 'Economically active: Unemployed',
        ein_homemaker__11: 'Economically inactive: Homemaker',
        ein_other__11: 'Economically inactive: Other',
        ein_pensioner__11: 'Economically inactive: Pensioner',
        ein_sick_disabled__11: 'Economically inactive: Long-term sick or disabled',
        ein_student__11: 'Economically inactive: Student',
        ein_student_16to17__11: 'Economically inactive: Schoolchildren and full time students Aged 16 to 17',
        ein_student_18pl__11: 'Economically inactive: Schoolchildren and full time students Aged 18 and over',
        ein_student_18to74__11: 'Economically inactive: Full-time students Age 18 to 74',
        hhi_communal__11: 'Person living in a communal establishment',
        hhi_divorced__11: 'Divorced from a marriage',
        hhi_health_bad__11: 'Person with bad health',
        hhi_health_fair__11: 'Person with fair health',
        hhi_health_good__11: 'Person with good health',
        hhi_health_verybad__11: 'Person with very bad health',
        hhi_health_verygood__11: 'Person with very good health',
        hhi_married__11: 'Person who is married',
        hhi_partner__11: 'Person who is in a registered partnership',
        hhi_private__11: 'Person living in a private household',
        hhi_seperated__11: 'Person who is seperated but still legally married or still legally in a same sex civil partnership',
        hhi_single__11: 'Person who has never married',
        hhi_widowed__11: 'Person who is widowed',
        ror_england__11: 'Origin in England',
        ror_eu_new__11: 'Origin in EU member state joined 2001 to 2011',
        ror_eu_old__11: 'Origin in 2001 EU member state',
        ror_ireland__11: 'Origin in Ireland',
        ror_ni__11: 'Origin in Northern Ireland',
        ror_other__11: 'Origin is not indicated or otherwise classifiable',
        ror_scotland__11: 'Origin in Scotland',
        ror_wales__11: 'Origin in Wales',
        rel_buddhist__11: 'Religion Buddhist',
        rel_catholic__11: 'Religion Catholic',
        rel_christian__11: 'Religion All Christan',
        rel_hindu__11: 'Religion Hindu',
        rel_jewish__11: 'Religion Jewish',
        rel_muslim__11: 'Religion Muslim',
        rel_na__11: 'Religion not specified',
        rel_none__11: 'Religion none',
        rel_none_christian__11: 'Religion Non-Christian',
        rel_other__11: 'Religion other',
        rel_other_christian__11: 'Religion Other Christan denomination',
        rel_sikh__11: 'Religion Sikh'
    },
    arrayZoom: {
        6: 'gb_hx_64k',
        7: 'gb_hx_32k',
        8: 'gb_hx_16k',
        9: 'gb_hx_8k',
        10: 'gb_hx_4k'
    }
};

// require('./grid')(layerGrid);