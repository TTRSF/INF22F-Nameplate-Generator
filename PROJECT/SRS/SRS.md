## Version Control

|Version|Date|Author|Comment|
|-----|-----------|------------|---------------------|
|1.0|13.10.2023|Tristan Kopp |first version|
|1.1|17.10.2023|Tristan Kopp |changed NFR|
|1.2|12.04.2024|Tristan Kopp |removed wrong FR|


## Table of contents
1. [Introduction](#intro)
2. [Scope](#scope)
3. [Overall Description](#od)
    - 3.1 [Product Perspective](#pp)
        * 3.1.1 [User Interfaces](#ui)
        * 3.1.2 [Hardware Interfaces](#hi)
        * 3.1.3 [Software Interfaces](#si)
        * 3.1.4 [Communication Interfaces](#314-communication-interface-)
4. [Use Cases](#uc)
    - 4.1 [UC01 Select a Server](#41-uc01-select-a-server-)
    - 4.2 [UC02 Browse the Server](#42-uc02-browse-the-server-)
    - 4.3 [UC03 Select and view an asset](#43-uc03-select-and-view-an-asset-)
    - 4.4 [UC04 Download in SVG format](#44-uc04-download-in-svg-format-)
    - 4.5 [UC05 Download in PNG format](#45-uc05-download-in-png-format-)
5. [System Requirements](#sr)
    - 5.1 [Functional Requirements](#fr)
        * 5.1.1 [FR.001 Application type](#REQ1)
        * 5.1.2 [FR.003 Data for nameplate generaton](#REQ2)
        * 5.1.3 [FR.004 QR-code generator](#REQ3)
        * 5.1.4 [FR.005 Nameplate generator](#REQ4)
        * 5.1.5 [FR.006 Error handling](#REQ5)
    - 5.2 [Non-functional Requirements](#nfr)
        * 5.2.1 [NFR.001 User-friendly](#NREQ1)
        * 5.2.2 [NFR.002 Performance](#NREQ2)
        * 5.2.3 [NFR.003 Reliability](#NREQ3)
        * 5.2.4 [NFR.004 Maintainability](#NREQ4)
        * 5.2.5 [NFR.005 License](#NREQ5)

## 1 Introduction <a name="intro"></a>

The objective of this document is to provide a detailed overview of the product by outlining guidelines and specifications. Thus, setting the foundation of the project and creating an agreement for all the stakeholders involved. Furthermore, it should operate as a bridge between product management development. Therefore, helping the technical team to design and develop the software. 

## 2 Scope <a name="scope"></a>

The main objective of this project is to create a nameplate generator for an Asset Administration Shell, also known as “AAS”. Furthermore, a user-friendly front-end application shall be designed and implemented utilizing React. This includes a home page where the user can enter a server address. After selecting the server, the user shall be directed to a user interface (UI) listing all the components available on the server. Additionally, the interface shall display the data regarding the asset chosen by the user in an organized and clear structure. Both search functions contain autocomplete. The interface allows the communication between any AAS server through REST-API as well as the ability to generate QR codes according to the DIN standard. Additionally, there shall be an option to download the data in SVG or PNG format. The application shall be tested to ensure compatibility with a diverse AAS server infrastructure.
The purpose of creating digital nameplates is to make nameplates environment-friendly due to a paper free solution. Moreover, it provides access to customers everywhere since it is not physically bound to a specific place. Not to mention the virtually unlimited space that can be used to display the information in more detail in reference to multiple assets. Furthermore, the information is dynamic. Thus, it can easily be changed and modified if necessary. 
The nameplate generator is for customers that not only want to generate and print the type plates but also use it as a modern solution to provide a better service for their company as well as their own customers. It guarantees a simpler information collection process as well as unlimited access from any place. 

## 3 Overall Description <a name="od"></a>

## 3.1 Product Perspective <a name="pp"></a>

As visible in figure 2.1, the front-end application is a React based project built using HyperText Markup Language (HTML), JavaScript (JS) and Cascading Style Sheets (CSS). It shall be deployed on a server and accessed through the internet with a web browser. 
The product relies on the AAS, which provides the information about the assets the product is going to display and utilize. This is accomplished with requests using the REST-API. 
The user’s web browser acts as the execution environment loading the application through Hypertext Transfer Protocol (Secure), also known as HTTP(S), as well as acquiring the data through REST-API from the AAS-Server.

![image](https://user-images.githubusercontent.com/96543571/200067955-e98e19cf-fb89-4739-b3d5-405ca32a5257.png)

*Figure 2.1:  Client Model Deployment Diagram*


## 3.1.1 User Interfaces <a name="ui"></a>

A graphical user interface (GUI) consisting of a home, table and detail page need to be designed and created. It shall be coherent, e.g., using terminology effortlessly understood by the intended users or rather the target group as well as consisting of a dynamic design meaning it shall adapt to different screen sizes, e.g. smart phone and laptop. Users shall be able to search for a server or a certain product in 30 sec-onds. The user shall easily recognize sections of the GUI with the assistance of vis-ual cues such as arrows, bold fonts and highlighting.
The interface has to be consistent, e.g., the buttons and formulations have to be the same throughout the pages. Additionally, the interface shall be compatible to multiple browsers, e.g., Chrome, Firefox and Edge.

## 3.1.2 Hardware Interface <a name="hi"></a>

Since the application runs using the internet, it requires the aptitude to connect to it. Additionally, it shall support most devices by running on smart phone as well as computers. 

## 3.1.3 Software Interfaces <a name="si"></a>

The system shall use React v18.2.0 and request the data using HTML5 fetch API. The single page front-end application shall be built using HTML, JS and CSS. Source and destination format of data include JSON. 

## 3.1.4 Communication Interface <a name="ui"></a>

The communication architecture abides the client-server model thus employing a REST-compliant web service. The system shall use the HTTP(S) for communication over the internet. 

## 4 Use Cases <a name="uc"></a>

|Use Case ID|UC01|
|----------------|-----------------------------|
|Description|The user wants a rendered nameplate for given AAS data. The user sends the data to the applications interface and receives a rendered nameplate|
|Involved roles|User, AAS-Server|
|System boundary|AAS-Server|
|Precondition|The server address is known. The user has prepared input data including AAS data and nameplate layout |
|Postcondition on success|The application renders the nameplate according to the input data and returns it to the user|
|Triggering event|The user calls the applications interface specific to rendering a nameplate with given AAS data|

|Use Case ID|UC02|
|----------------|-----------------------------|
|Description|The user wants a rendered nameplate for a given reference to AAS data. The user sends the layout data for the nameplate and a reference to the AAS data to the application interface and receives a rendered nameplate|
|Involved roles|User, AAS-Server, external AAS storage|
|System boundary|AAS-Server, external AAS storage|
|Precondition|The user has defined the nameplate layout n the format needed bey the application and has a reference to the AAS data |
|Postcondition on success|The application loads the AAS data from the reference and renders the nameplate according to the input data and the referenced AAS data|
|Triggering event|The user calls the applications interface specific to rendering a nameplate with referencing AAS data|


## 5 System Requirements <a name="sr"></a>

The requirements shall be described using a requirement number, an overview describing the requirement, originator, fit criterion and a priority number. The requirements shall be ranked from 0 to 5. 0 being the least important and 5 being the highest priority. This enables the developers to determine which requirements, have a higher priority and therefore need to be dealt with first or which ones are rather optional.

## 5.1  Functional Requirements <a name="fr"></a>

The requirements shall be described using a requirement number, an overview describing the requirement, originator, fit criterion and a priority number. The requirements shall be ranked from 0 to 5. 0 being the least important and 5 being the highest priority. This enables the developers to determine which requirements, have a higher priority and therefore need to be dealt with first or which ones are rather optional.

## 5.1.1 FR.001 Application Type <a name="REQ1"></a>

|Requirement ID|FR.001|
|----------------|-----------------------------|
|Overview|The application shall be developed as server application. It should be usable on all common OS. The application shall provide a machine readable interface.|
|Originator|Customer|
|Fit Criterion|The application shall compile on Linux on windows. It shall run on Linux and Windows. The application interface should be testable with automated tests.|

## 5.1.2 FR.002 Data source for nameplate generation <a name="REQ2"></a>
|Requirement ID|FR.002|
|----------------|-----------------------------|
|Overview|The application shall use AAS data for nameplate generation. The user shall be able to choose how AAS data is provided. It shall be possible to provide AAS data directly as input or provide a reference to AAS data. When a reference to AAS data is given, the application shall use the referenced AAS data for nameplate generation|
|Originator|Customer|
|Fit Criterion|Generated output shall not differ if AAS data is provided directly or via a reference. It shall contain only data from given AAS data|

## 5.1.3 FR.003 QR-Code generator <a name="REQ3"></a>
|Requirement ID|FR.003|
|----------------|-----------------------------|
|Overview|The application is able to generate QR-codes for the nameplates.|
|Originator|Customer|
|Fit Criterion|Generated QR-codes shall correspond to the DIN Standard and contain information in the following order: General Information, Technical Specification, Certificates and Patents|

## 5.1.4 FR.004 Nameplate generator <a name="REQ4"></a>
|Requirement ID|FR.004|
|----------------|-----------------------------|
|Overview|It can create nameplates for the chosen asset.|
|Originator|Customer|
|Fit Criterion|Nameplates according to the DIN standard shall be generated out of the asset the user chose. It shall contain all the necessary information such as general Information, warning signs, certificates and a QR-code.|

## 5.1.5 FR.005 Error handling <a name="REQ5"></a>
|Requirement ID|FR.005|
|----------------|-----------------------------|
|Overview|The system has sufficient error handling.|
|Originator|Customer|
|Fit Criterion|The application shall handle malformed input data gracefully. In case of malformed input data or other circumstances preventing the application to render a nameplate, it shall fail gracefully and return an appropriate error message to the user. It shall not stop working without a detailed error message.|

## 5.2  Non-functional Requirements <a name="nfr"></a>
## 5.2.1 NFR.001 User-friendly <a name="NREQ1"></a>

|Requirement ID|NFR.001|
|----------------|-----------------------------|
|Overview|The application should be user-friendly, thus, a user with no experience with the interface shall be able to use it effortlessly.|
|Originator|Customer|
|Fit Criterion|An inexperienced user shall be able to understand the application interface in two minutes. The user shall be able to understand the layout format in less than 1 hour. Given a layout format and AAS data or a reference to AAS data, a user shall be able to request a nameplate in less than 10 Minutes|

## 5.2.2 NFR.002 Performance <a name="NREQ2"></a>

|Requirement ID|NFR.002|
|----------------|-----------------------------|
|Overview|The software should maintain a high performance in terms of how data processing speed and nameplate generation. This also includes fetching AAS data from an external source if a reference is given|
|Originator|Customer|
|Fit Criterion|The standard request time will be no longer than 5 seconds. This time doesn't include network delay for both request and answer.|

## 5.2.3 NFR.003 Reliability<a name="NREQ3"></a>

|Requirement ID|NFR.003|
|----------------|-----------------------------|
|Overview|The application needs to be reliable in terms of containing the right information. |
|Originator|Customer|
|Fit Criterion|The nameplates and QR-codes have to be generated according to the DIN standard. The information must belong to the chosen asset meaning there shall not be a false exchange of data regarding different assets.|

## 5.2.4 NFR.004 Maintainability <a name="NREQ4"></a>

|Requirement ID|NFR.004|
|----------------|-----------------------------|
|Overview|The website requires a high maintainability.|
|Originator|Team|
|Fit Criterion|Each team member shall be able to read and understand the code as well as knowing how to make changes. Additionally, developers not belonging to the team shall be able to do so as well after reading the code for five hours. |

## 5.2.5 NFR.005 License <a name="NREQ5"></a>

|Requirement ID|NFR.005|
|----------------|-----------------------------|
|Overview|The product is an open source software thus a license for publishing it is required.|
|Originator|Team|
|Fit Criterion|The product shall published under a license approved by the Open Source Initiative and will be added to GitHub.|

