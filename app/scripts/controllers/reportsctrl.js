'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('ReportsCtrl', function($scope, $state,$http,$stateParams) {
    $scope.$state = $state;

    $scope.menuItems = [];
    angular.forEach($state.get(), function (item) {
      if (item.data && item.data.visible) {
        $scope.menuItems.push({name: item.name, text: item.data.text});
      }
    });
    var age = $stateParams.age;
    var income = $stateParams.income;
    var graphDataX = "";
    var graphDataY = "";
    var resultsData = "";

    //Updating the current Scope


    var params = {
      "income": income,
      "age": age
    };
    //Talk to the Lambda Function to get Portfolio information.

    var apiURL = "https://y7m9207v4m.execute-api.us-east-1.amazonaws.com/prod";
    $http.post(apiURL, params)
      .success(function (result) {
        //var resultsData = result;;
        $scope.data = result;
        $scope.pieData = $scope.data.plans.conservative;
        graphDataX = result.plans.conservative.graphDataX;
        graphDataY = result.plans.conservative.graphDataY;
        //Json for line chart
        $scope.myJson = {
          gui: {
            contextMenu: {
              button: {
                visible: 0
              }
            }
          },
          backgroundColor: "#34495E",
          globals: {
            shadow: false,
            fontFamily: "Helvetica"
          },
          type: "area",

          legend: {
            layout: "x4",
            backgroundColor: "transparent",
            borderColor: "transparent",
            marker: {
              borderRadius: "50px",
              borderColor: "transparent"
            },
            item: {
              fontColor: "white"
            }

          },
          scaleX: {
            zooming: true,
            values: graphDataX,
            lineColor: "white",
            lineWidth: "1px",
            tick: {
              lineColor: "white",
              lineWidth: "1px"
            },
            item: {
              fontColor: "white"
            },
            guide: {
              visible: false
            }
          },
          scaleY: {
            lineColor: "white",
            lineWidth: "1px",
            tick: {
              lineColor: "white",
              lineWidth: "1px"
            },
            guide: {
              lineStyle: "solid",
              lineColor: "#626262"
            },
            item: {
              fontColor: "white"
            },
          },
          tooltip: {
            visible: true
          },
          crosshairX: {
            scaleLabel: {
              backgroundColor: "#fff",
              fontColor: "black"
            },
            plotLabel: {
              backgroundColor: "#434343",
              fontColor: "#FFF",
              _text: "Number of hits : %v"
            }
          },
          plot: {
            lineWidth: "2px",
            aspect: "spline",
            marker: {
              visible: false
            }
          },
          series: [{
            text: "Conservative",
            values: result.plans.conservative.graphDataY,
            backgroundColor1: "#77d9f8",
            backgroundColor2: "#272822",
            lineColor: "#40beeb"
          },
            {
              text: "Moderately Conservative",
              values: result.plans.moderatelyC.graphDataY,
              backgroundColor1: "#4AD8CC",
              backgroundColor2: "#272822",
              lineColor: "#4AD8CC"
            },
            {
              text: "Aggressive",
              values: result.plans.moderatelyA.graphDataY,
              backgroundColor1: "#1D8CD9",
              backgroundColor2: "#1D8FF9",
              lineColor: "#1D8CD9"
            },
            {
              text: "Moderately Aggressive",
              values: result.plans.aggressive.graphDataY,
              backgroundColor1: "#D8CD98",
              backgroundColor2: "#272822",
              lineColor: "#D8CD98"
            }]
        };

        //JSON for PIE
        $scope.pie = {
          globals: {
            shadow: false,
            fontFamily: "Verdana",
            fontWeight: "100"
          },
          type: "pie",
          backgroundColor: "#34495E",

          legend: {
            layout: "x5",
            position: "50%",
            borderColor: "transparent",
            marker: {
              borderRadius: 10,
              borderColor: "transparent"
            }
          },
          tooltip: {
            text: "%v share"
          },
          plot: {
            refAngle: "-90",
            borderWidth: "0px",
            valueBox: {
              placement: "in",
              text: "%npv %",
              fontSize: "15px",
              textAlpha: 1,
            }
          },
          series: [{
            text: "Large Stocks",
            values: [$scope.pieData.largestocks] ,
            backgroundColor: "#FA6E6E #FA9494",
          }, {
            text: "Small Co Stocks",
            values: [$scope.pieData.smallcostocks],
            backgroundColor: "#F1C795 #feebd2"
          }, {
            text: "Real Estate",
            values: [$scope.pieData.realestate],
            backgroundColor: "#FDAA97 #FC9B87"
          }, {
            text: "Emerging Markets",
            values: [$scope.pieData.emergingmarkets],
            backgroundColor: "#28C2D1"
          }, {
            text: "Corporate Bonds",
            values: [$scope.pieData.corporatebonds],
            backgroundColor: "#D2D6DE",
          },{
            text: "Goverment Bonds",
            values: [$scope.pieData.govermentbonds],
            backgroundColor: "#D2D6DE",
          }]
        };

      });

    $scope.description = "Conservative is the highest priority goal we recommend for investors. Our allocation advice for this goal is fixed at 40% stocks. Our rigorous modeling and testing has shown that investing is a reliable alternative to a cash savings account..";
    $scope.updateGraph = function (type) {
      switch (type) {
        case 'conservative':
          $scope.description = "Conservative is the highest priority goal we recommend for investors. Our allocation advice for this goal is fixed at 40% stocks. Our rigorous modeling and testing has shown that investing is a reliable alternative to a cash savings account..";
          $scope.prediction = "As per out research with an monthly payment of $" + $scope.data.monthlyplan + " you should be able to save $" + $scope.data.plans.conservative.graphDataY[10] + " by the age " + $scope.data.plans.conservative.graphDataX[10];
          $scope.plansInfo = $scope.data.plans.conservative;
          $scope.pieData = $scope.data.plans.conservative;
          $scope.pie.series[0].values.splice(0,1);$scope.pie.series[0].values.push($scope.pieData.largestocks);
          $scope.pie.series[1].values.splice(0,1);$scope.pie.series[1].values.push($scope.pieData.smallcostocks);
          $scope.pie.series[2].values.splice(0,1);$scope.pie.series[2].values.push($scope.pieData.realestate);
          $scope.pie.series[3].values.splice(0,1);$scope.pie.series[3].values.push($scope.pieData.emergingmarkets);
          $scope.pie.series[4].values.splice(0,1);$scope.pie.series[4].values.push($scope.pieData.corporatebonds);
          $scope.pie.series[5].values.splice(0,1);$scope.pie.series[5].values.push($scope.pieData.govermentbonds);
          break;
        case 'moderatelyC':
          $scope.description = "This goal does not have a specific purchase or withdrawal date baked into the advice, which makes it an ideal goal for objectives such as long-term savings that are earmarked for generational wealth transfer, assets that may be converted into a trust account at a later date, or an unknown future major purchase.";
          $scope.prediction = "As per out research with an monthly payment of " + $scope.data.monthlyplan + " you should be able to save $" + $scope.data.plans.moderatelyC.graphDataY[10] + " by the age " + $scope.data.plans.moderatelyC.graphDataX[10];
          $scope.plansInfo = $scope.data.plans.moderatelyC;
          $scope.pieData = $scope.data.plans.moderatelyC;
          $scope.pie.series[0].values.splice(0,1);$scope.pie.series[0].values.push($scope.pieData.largestocks);
          $scope.pie.series[1].values.splice(0,1);$scope.pie.series[1].values.push($scope.pieData.smallcostocks);
          $scope.pie.series[2].values.splice(0,1);$scope.pie.series[2].values.push($scope.pieData.realestate);
          $scope.pie.series[3].values.splice(0,1);$scope.pie.series[3].values.push($scope.pieData.emergingmarkets);
          $scope.pie.series[4].values.splice(0,1);$scope.pie.series[4].values.push($scope.pieData.corporatebonds);
          $scope.pie.series[5].values.splice(0,1);$scope.pie.series[5].values.push($scope.pieData.govermentbonds);

          break;
        case 'aggressive':
          $scope.description = "With our Aggressive portfolio we assume you’ll ease into full retirement mode—rather than needing all your money on an exact date in the future. When you have 20 or more years until your planned retirement age, we recommend 90% stocks in order to maximize growth.";
          $scope.prediction = "As per out research with an monthly payment of " + $scope.data.monthlyplan + " you should be able to save $" + $scope.data.plans.aggressive.graphDataY[10] + " by the age " + $scope.data.plans.aggressive.graphDataX[10];
          $scope.plansInfo = $scope.data.plans.aggressive;
          $scope.pieData = $scope.data.plans.aggressive;
          $scope.pie.series[0].values.splice(0,1);$scope.pie.series[0].values.push($scope.pieData.largestocks);
          $scope.pie.series[1].values.splice(0,1);$scope.pie.series[1].values.push($scope.pieData.smallcostocks);
          $scope.pie.series[2].values.splice(0,1);$scope.pie.series[2].values.push($scope.pieData.realestate);
          $scope.pie.series[3].values.splice(0,1);$scope.pie.series[3].values.push($scope.pieData.emergingmarkets);
          $scope.pie.series[4].values.splice(0,1);$scope.pie.series[4].values.push($scope.pieData.corporatebonds);
          $scope.pie.series[5].values.splice(0,1);$scope.pie.series[5].values.push($scope.pieData.govermentbonds);

          break;
        default:
          $scope.description = "As you save and invest over time, and your nest egg grows, our advice slowly reduces your risk. At retirement, we recommend a 56% stock allocation, then a continued reduction in risk thereafter.";
          $scope.prediction = "As per out research with an monthly payment of " + $scope.data.monthlyplan + " you should be able to save $" + $scope.data.plans.moderatelyA.graphDataY[10] + " by the age " + $scope.data.plans.moderatelyA.graphDataX[10];
          $scope.plansInfo = $scope.data.plans.moderatelyA;
          $scope.pieData = $scope.data.plans.moderatelyA;
          $scope.pie.series[0].values.splice(0,1);$scope.pie.series[0].values.push($scope.pieData.largestocks);
          $scope.pie.series[1].values.splice(0,1);$scope.pie.series[1].values.push($scope.pieData.smallcostocks);
          $scope.pie.series[2].values.splice(0,1);$scope.pie.series[2].values.push($scope.pieData.realestate);
          $scope.pie.series[3].values.splice(0,1);$scope.pie.series[3].values.push($scope.pieData.emergingmarkets);
          $scope.pie.series[4].values.splice(0,1);$scope.pie.series[4].values.push($scope.pieData.corporatebonds);
          $scope.pie.series[5].values.splice(0,1);$scope.pie.series[5].values.push($scope.pieData.govermentbonds);

      }
    };

    $scope.updateDesc = function (type) {
      switch (type) {
        case 'largestocks':
          $scope.desc = "Roughly $0.13 of every dollar invested will purchase the Vanguard S&amp;P500 ETF (VOO). This ETF provides investors with exposure to 500 of the largest U.S. companies.";
          break;
        case 'smallcostocks':
          $scope.desc = "Roughly $0.25 of every dollar invested will purchase the Vanguard Small-Cap ETF (VB). This ETF provides investors with exposure to a broadly diversified index of stocks of smaller U.S. companies.";
          break;
        case 'realestate':
          $scope.desc = "Roughly $0.22 of every dollar invested will purchase the Vanguard REIT ETF (VNQ). This ETF provides investors with exposure to companies that purchase real estate properties, such as apartment complexes, hotels, and office buildings.";
          break;
        case 'corporatebonds':
          $scope.desc = "Roughly $0.13 of every dollar invested will purchase the iShares Corporate Bond ETF (LQD). This ETF provides investors with exposure to a wide pool of corporate bonds.";
          break;
        case 'govermentbonds':
          $scope.desc = "Roughly $0.13 of every dollar invested will purchase the iShares 1-3 year Treasury Bond ETF (SHY). This ETF provides investors with exposure to short term U.S. Treasury bonds.";
          break;
        default:
          $scope.desc = "Roughly $0.14 of every dollar invested will purchase the Vanguard FTSE Emerging Markets (VWO). This ETF provides investors with exposure to stocks of companies in emerging markets all over the globe, such as Brazil, China, and South Africa.";

      }
    };
  });
