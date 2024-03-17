d3.csv(
  "https://raw.githubusercontent.com/Siyou-Wang/HackSwift-Project/main/filteredHunger.csv",
  function (err, rows) {
    function unpack(rows, key) {
      return rows.map(function (row) {
        return row[key];
      });
    }

    var data = [
      {
        type: "choropleth",
        locationmode: "country names",
        locations: unpack(rows, "Entity"),
        z: unpack(rows, "Global Hunger Index (2021)"),
        text: '<a href=unpack(rows, "Donations")>Donate</a>',
        colorscale: [
          [0, "rgb(185, 251, 100)"],
          [0.39, "rgb(255, 215, 0)"],
          [0.4, "rgb(255, 215, 0)"],
          [0.68, "rgb(190, 50, 50)"],
          [0.69, "rgb(199, 54, 54)"],
          [1, "rgb(179, 34, 34)"]
        ],
        autocolorscale: false,
        reversescale: false
      }
    ];

    var layout = {
      title: "Global Hunger Levels 2021 According to World Hunger Index",
      geo: {
        projection: {
          type: "miller"
        }
      }
    };

    Plotly.newPlot("map", data, layout, { showLink: false });
    map.on("plotly_click", (d) => {
      var pt = (d.points || [])[0];
      console.log(pt.location);
      var ind = 0;
      var tenpA = unpack(rows, "Entity");
      for (let i = 0; i < unpack(rows, "Entity").length; i++) {
        if (pt.location == unpack(rows, "Entity")[i]) {
          ind = i;
        }
      }

      if (
        window.confirm(
          "Pressing OK will take you to a donation site to help those in " +
            pt.location
        )
      ) {
        window.open(unpack(rows, "Donations")[ind], "_blank");
      }
    });
    //"Please go to the following link to donate to this cause \n" +
  }
);
