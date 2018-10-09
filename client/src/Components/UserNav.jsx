import React from 'react';
import NavComponents from './NavComponents.jsx';

const UserNav = (props) => {
  return (
    <div>
      <NavComponents tab={props.tab} />
      <div className="row" >
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center" >
          {/* <a className="text-center" > <img style={{ height: '30px' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOwSURBVGhD7Zk7aNVwGMVbiy1WsTgouEhpkS4WBwfxBd1F0KEOInZQEAe1Ts6KL0SlKCoiYhVELI46CC5awcHHpJM6VBDECj6Kg4pXf+feLzf5p7m3Se6NSaEHDl/+53vkfwhpktuWORQVpVJpAbwAP/8tANjHNUKbbS8+aDxfGVEcsKebhGRmaJqEwiqTqmBYlw2eMKnpYPZmO8c9uB5+s3UyM2oCX23pAL1pRpjRwaglIseLTXaM2DqdGTWATI3QvwxOapYH1mcs5xgROE5uRsUgUyOM2GhzfsPvdjyuHHGaEYF1MjMqBP/LyHjwWDlipBEBLb4ZFYFCGhHQ45lRASisEYHczGaUBIU2IpAPmjlssg8lQOGNCNTstdpLJvlQAswWIzusNncjz+B2O559RujfoDlBoD2yXBIj2+BPmNsV6WLGE/jO+AbuU44Y24hAaRu1S23pQ0NApkbqIYkRapZT2tBz5AOhJwsyezexphH0DngOfrG6KcIo7LKSCpQEtYy00vixUpI5Ttlpq0Dr5PwPKmkX6E8J/tWpyNFGBBrWwYfUPM+KzL8Kq6/2ArpM6Lz1MGjlMxvJA+ynaoI4AYfgD62DQBuxluIZYS+OCUKP6QNhM6xPl5sE0wphhH1EmvDAOmxmwFLFMcIe6poQ0Pth+UuTeMPkCiSCukbI6yHUR1zTZHbb/LgmPlnNXYL7PFEC1DRiA95aXdPAzPewl8M0JuZbyoeSoJ6RFyqwk0T++UxKZj2GqU2IlvahAhBpBF0nKikP201uCmx2YhPE1fColfhQEahlJJN3LUamMdFO7JMG83n7DYJxqUyYnu/3iAdGpTYhsM7fCGMaMiGg5f6p27AJAT0/I7Q3xYRALj8j9J71ZhBimYCLLO2AfK5Gym8FxGMmVYE2zQRRz4nrVuIAPR8jtHar3wNzhi1Vy0SvNFjrszcfI/TtUX8QaMMw8p7guO4PEei5Gbmt/jDQ9QOCY0Jg3RwjRL2QDcKttk5thLZ59Dn/pQqC3B1C+DnhGOFwBRxkvdbysY2UNw6cNY2JjdCzUr0eWE/B+/AQ7LcyB+iOEaK38Vuh9YxGOuEYHLV1I1dEH2Mn4BG4iXXksyEI6sJXRL8Zj7E+YPl87pGk4Dzp7xHEP1Af9K0mVYFWNCO7LH/RJB+Iryw5QtCNXiXaEFE53bROLgtynpNEnU9fpeHcTviSY+X32/Z9IG6Bv1QwG8BeX8OFtn0XJPRacBxeKTAvw4Mw2sQcCoGWln+dw/NcFpF8WwAAAABJRU5ErkJggg=="/></a> */}
          <button type="button" id="LogoutBtn" style={{ fontSize : '12px' }}  onClick={props.logout} > LOG OUT</button>        
        </div>
      </div>
    </div>
  )
}

export default UserNav;