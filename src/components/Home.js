import React, { useState, useEffect } from 'react';

const Home = () => {

    const [url, setUrl] = useState()
    const [allUrls, setAllUrls] = useState([])

    const formSubmitHandler = async e => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/shorten/", {
            method: "POST",
            body: JSON.stringify({url}),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        setUrl("")
        getUrls()

    }

    const getUrls = async () => {
        const response = await fetch("http://localhost:5000/api/get")
        const data = await response.json()
        setAllUrls(data)
    }

    useEffect(() => {
        getUrls()
    }, [])

    return (
        <div className="home">
            <form className="my-4 form-inline"  onSubmit={formSubmitHandler}>
                <label htmlFor="url" className="sr-only">URL</label>
                <input required type="text" id="url" className="form-control col mr-2" value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste link to shorten"/>
                <button type="submit" className="btn btn-success">Shorten</button>
            </form>
            <div className="url-table">
                <div className="url-row url-table__head">
                    <h4>Full</h4>
                    <h4>shortened</h4>
                    <h4>clicks</h4>
                </div>
                <div className="url-body">
                    {allUrls.map(url => (
                        <div className="url-row">
                            <a target="_blank" href={url.full}>{url.full}</a>
                            <a target="_blank" href={`/short-me/${url.shortened}`}>{url.shortened}</a>
                            <span>{url.clicks}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
