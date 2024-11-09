let motoGP = [
    {
        circuit: 'Losail',
        location: 'Qatar',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy'
        }
    },
    {
        circuit: 'Autodromo',
        location: 'Argentine',
        winner: {
            firstName: 'Cal',
            lastName: 'Curtchlow',
            country: 'UK'
        }
    },
    {
        circuit: 'De Jerez',
        location: 'Spain',
        winner: {
            firstName: 'Valentino',
            lastName: 'Rossi',
            country: 'Italy'
        }
    },
    {
        circuit: 'Mugello',
        location: 'Italy',
        winner: {
            firstName: 'Andrea',
            lastName: 'Dovizioso',
            country: 'Italy'
        }
    }
]

const http = require('http');
const port = 8000;
const groupCountry = {}
const groupWinner = {}

for (var i = 0; i < motoGP.length; i++) {
    const { firstName, lastName, country } = motoGP[i].winner
    let fullName = `${firstName} ${lastName}`

    if (!groupCountry[country]) {
        groupCountry[country] = []
    }

    groupCountry[country].push({
        circuit: motoGP[i].circuit,
        location: motoGP[i].location,
        winner: fullName
    });
}

for (var i = 0; i < motoGP.length; i++) {
    const { firstName, lastName, country } = motoGP[i].winner
    let full = `${firstName} ${lastName} dari ${country}`

    if (!groupWinner[full]) {
        groupWinner[full] = []
    }

    groupWinner[full].push({
        circuit: motoGP[i].circuit,
        location: motoGP[i].location,
    });
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url == '/') {
        motoGP.forEach(race => {
            const fullName = `${race.winner.firstName} ${race.winner.lastName}`;
            res.write(`
                <p>Circuit: ${race.circuit}</p>
                <p>Location: ${race.location}</p>
                <p>WINNER ===</p>
                <p>Name: ${fullName}</p>
                <p>Country: ${race.winner.country}</p>
                <hr/>
            `)
        });
    } else if (req.url == '/country') {
        for (const country in groupCountry) {
            res.write(`<h2>Country: ${country}</h2>`)
            groupCountry[country].forEach(race => {
                res.write(`<p>Circuit: ${race.circuit}, Location: ${race.location}, Winner: ${race.winner}</p>`)
            })
        }
    } else if (req.url == '/name') {
        for (const win in groupWinner) {
            res.write(`<h2>Name: ${win}</h2>`);
            groupWinner[win].forEach(race => {
                res.write(`<p>Circuit: ${race.circuit}, Location: ${race.location}</p>`);
            });
        }
    } else {
        res.write('<h2>NOT FOUND 404</h2>')
    }

    res.end();
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});