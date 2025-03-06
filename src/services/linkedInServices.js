import axios from "axios";

export const linkedInJobSearchSrapper = async (keyword, location, start) => {

    const res = await axios.get(`https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${keyword}&location=${encodeURI(location)}&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0&start=${start}`, {
    headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "csrf-token": "ajax:1361521069337831127",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Microsoft Edge\";v=\"133\", \"Chromium\";v=\"133\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "JSESSIONID=ajax:1361521069337831127; lang=v=2&lang=en-us; bcookie=\"v=2&32aa5bb8-a90e-4db0-8e63-8313d7bcda38\"; bscookie=\"v=1&202503050129546a04f643-6227-425c-8c52-be8cc459ff16AQH8CeD-g3MdpvlfrtwbP513VhWlny61\"; lidc=\"b=TGST09:s=T:r=T:a=T:p=T:g=2977:u=1:x=1:i=1741138194:t=1741224594:v=2:sig=AQERw72cKkbvG-4nDReUeWzCjHJ1i96o\"; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C20153%7CMCMID%7C19168118002397146401873532807002112195%7CMCAAMLH-1741742993%7C12%7CMCAAMB-1741742993%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1741145393s%7CNONE%7CvVersion%7C5.1.1; aam_uuid=18979297682030762511931779351801770760; _gcl_au=1.1.1840979962.1741138201; _uetsid=5aecc340f96111ef9f73cf35ab9cc388; _uetvid=5aecd420f96111ef8f96d1aae8fca469",
        "Referer": `https://www.linkedin.com/jobs/search?keywords=${keyword}&location=${location}&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`,
        "Referrer-Policy": "strict-origin-when-cross-origin"
        }
    });
    
    const foramttedData = ForamtLinkedJobs(res.data);
    return foramttedData;
}


const ForamtLinkedJobs = (html) => {
    const $ = cheerio.load(html);

    const jobListings = [];

    $('.base-card').each((index, element) => {
    const title = $(element).find('.base-search-card__title').text().trim();
    const company = $(element).find('.base-search-card__subtitle a').text().trim();
    const location = $(element).find('.job-search-card__location').text().trim();
    const postedTime = $(element).find('time.job-search-card__listdate').text().trim();
    
        // console.log({
        //     "title": title,
        //     "company": company,
        //     "location": location,
        //     "postedTime": postedTime
        // })
    jobListings.push({
        title,
        company,
        location,
        postedTime
    });
    });
    
    return jobListings;
}

export const LinkedInPeopleSearchScrapper = async (firstName, lastName, start) => {
    console.log(firstName, lastName, start)
    const res = await axios.get(`https://www.linkedin.com/pub/dir?firstName=${firstName}&lastName=${lastName}&trk=people-guest_people-search-bar_search-submit`, {
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "priority": "u=0, i",
        "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Microsoft Edge\";v=\"133\", \"Chromium\";v=\"133\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "JSESSIONID=ajax:1361521069337831127; lang=v=2&lang=en-us; bcookie=\"v=2&32aa5bb8-a90e-4db0-8e63-8313d7bcda38\"; bscookie=\"v=1&202503050129546a04f643-6227-425c-8c52-be8cc459ff16AQH8CeD-g3MdpvlfrtwbP513VhWlny61\"; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; aam_uuid=18979297682030762511931779351801770760; _gcl_au=1.1.1840979962.1741138201; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C20153%7CMCMID%7C19168118002397146401873532807002112195%7CMCAAMLH-1741782094%7C12%7CMCAAMB-1741782094%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1741184494s%7CNONE%7CvVersion%7C5.1.1; _uetsid=5aecc340f96111ef9f73cf35ab9cc388; _uetvid=5aecd420f96111ef8f96d1aae8fca469; __cf_bm=rJg81j9hDY9oTH_Ik2ETSOq0iiQDBlqhkFFyHloWdqQ-1741179083-1.0.1.1-bRFNnnQMvhya2xYLCwO7oTkBLpgiFDKY35pS9ooChsBK1bPIyhFiyg4IVz0EfZNkInFZypXgukVqt3Ic5SThoCV0tadEry1.2m7dSjvVM9g; lidc=\"b=OGST06:s=O:r=O:a=O:p=O:g=3228:u=1:x=1:i=1741179347:t=1741265747:v=2:sig=AQFpeKkV9pC1v0r5FLgT_yvDxHCPhZU6\"; recent_history=AQEhZPnNq_JPzAAAAZVmYdug2aLnnGWw_LTad0io_x-_gE-az4-sp-yVZeuCeemqe5md27FGQv9oG85RlaCfjBeWzyXHDJsjY_UXz68vlOfCqlTRU4_8VU3XRr6Hnzq0cNWQ7Rzqwt0dAZGh13m49hCY2mR1xp1GhVbYJPOC77C2Y5oKlBKHV4HOqH5ckF1oEIufEzC0jBl96225PqlgLA6JES28CSb6ubR5drawhPqYK93rDdwCP409m6rllpYN2hwccHdrdOINApTzyamn3H9z7Sw",
        "Referer": "https://www.linkedin.com/pub/dir?firstName=Deiveegan&lastName=&trk=people-guest_people-search-bar_search-submit",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    }
    });
    
    console.log(res)
    const formattedData = formatLinkedInPeople(res.data);
    return formattedData;
}


const formatLinkedInPeople = (html) => {

    const $ = cheerio.load(html);

    const people = [];

    $('li.pserp-layout__profile-result-list-item').each((index, element) => {
    const name = $(element).find('.base-search-card__title').text().trim();
    const jobTitle = $(element).find('.base-search-card__subtitle').text().trim();
    const location = $(element).find('.people-search-card__location').text().trim();
    
    const profileUrl = $(element).find('a').attr('href');

    const companies = [];
    $(element).find('.entity-list-meta__entities-list').each((i, el) => {
        companies.push($(el).text().trim());
    });

    const education = [];
    $(element).find('.entity-list-meta__entities-list').each((i, el) => {
        education.push($(el).text().trim());
    });
        
    // console.log({
    //     "name": name,
    //     "jobTitle": jobTitle,
    //     "location": location,
    //     "profileUrl": profileUrl,
    //     "companies": companies,
    //     "education": education
    // })
    people.push({
        name,
        jobTitle,
        location,
        profileUrl,
        companies,
        education
    });
    });
    // console.log(people)
    return people;

}