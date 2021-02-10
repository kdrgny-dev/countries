import Link from 'next/link'

export const getStaticPaths = async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await res.json();

    const paths = data.map(country => {
        return {
            params: { id: country.alpha3Code }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;

    const res = await fetch('https://restcountries.eu/rest/v2/alpha/' + id);
    const data = await res.json();

    return {
        props: {
            country: data,
            mounrty: 'aaa'
        }
    }
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Detail = ({ country }) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>{country.name}</h1>
                    <p>
                        Population : {numberWithCommas(country.population)}
                    </p>
                    <p>
                        Area : {numberWithCommas(country.area)} km²
                    </p>
                    <p>
                        Native Name : {country.nativeName}
                    </p>
                    <p>
                        Capital : {country.capital}
                    </p>
                    <p>
                        Time Zones : {country.timezones}
                    </p>
                    {
                    country.currencies.map(cur => (
                        <p>Currencies :
                            <span>{cur.name}</span>
                            <span>{cur.symbol}</span>
                        </p>
                        ))
                    }
                    {
                        country.languages.map(lang => (
                            <p>
                                Language : <br />
                                {lang.name} <br />
                                Native Name : {lang.nativeName}
                            </p>
                        ))
                    }
                    <p>
                        Calling Code : {country.callingCodes}
                    </p>
                    
                    <div>
                        <iframe
                            width="100%"
                            height="500"
                            frameborder="0"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD6-PjisbRt3L07W9s8phZueN_OAsHWaF4&q=${country.name}&zoom=4`} allowfullscreen>
                        </iframe>
                    </div>
                        
                    
                    <Link href="/">
                        <a className="btn btn-primary">Go Home</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Detail;