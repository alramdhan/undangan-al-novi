import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import './App.css';
import 'animate.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faCalendarDay,
  faHome,
  faComments,
  faClock,
  faMap,
  faCopy,
  faGift,
  faGifts
} from '@fortawesome/free-solid-svg-icons';
import IG from './images/instagram.svg';
import mempelai from './images/mempelai.png';
// main
import WelcomeModal from './Welcome.js';
import Petals from './Petals.js';
import ImgPlay from './images/play.png';
import ImgPause from './images/pause.png';
import FotoMain from './images/foto-main.png';
import Bismillah from './images/bismillah.png';
import DividerStyle from './images/divider.png';
import Bunga1 from './images/bg-mempelai1.png';
import Bunga2 from './images/bg-mempelai2.png';
import MempelaiPria from './images/mempelai-pria.png';
import MempelaiWanita from './images/mempelai-wanita.png';
import AdabWalimah from './images/adab-walimah.png';
import Clock from './images/clock-regular.svg';
import BCA from './images/bca.png';
import Mandiri from './images/mandiri.svg';
import song from './audio/deen-assalam.mp3';
import { Badge, Button, Card, Form, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = "https://invitation-alnovi.000webhostapp.com/api";

function App() {
  const colorAvatar = [
    "#FDDE55",
    "#C738BD",
    "#EE4E4E",
    "#9BEC00",
    "#615EFC",
    "#90D26D",
  ];
  const [ucapan, setUcapan] = useState(null);
  const [selectedAbsen, setSelectedAbsen] = useState(-1);
  const [playAudio, setPlayAudio] = useState(true);

  useEffect(() => {
    AOS.init();
    fetchUcapan();
  }, []);

  const fetchUcapan = () => {
    axios.get(`${baseUrl}/v1/getUcapan`).then((response) => {
      setUcapan(response.data);
    });
  }

  const controlAudio = () => {
    const audio = document.getElementById("play-song");
    setPlayAudio(!playAudio);
    if(!playAudio) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  const kirimUcapan = () => {
    const formData = new FormData();
    const nama = document.getElementById("txt-nama");
    const ucapan = document.getElementById("txt-ucapan");
    if(nama.value === '' || ucapan.value === '' || selectedAbsen === -1) {
      Swal.fire({
        title: "Peringatan",
        text: "Form ucapan tidak boleh kosong",
        icon: 'info',
      });
    } else {
      formData.append("nama_tamu", nama.value);
      formData.append("ucapan", ucapan.value);
      formData.append("absen", selectedAbsen);
      
      axios.post(`${baseUrl}/v1/addUcapan`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if(response.data["response_code"] === 201) {
          Swal.fire({
            title: "Terkirim",
            text: "Terima kasih untuk ucapan dan do'a nya ^^",
            icon: 'success',
          }).then((result) => {
            if(result.isConfirmed) {
              nama.value = "";
              ucapan.value = "";
              setSelectedAbsen(-1);
              document.getElementById("txt-absen").value = "";
              fetchUcapan();
            }
          });
        }
      }).catch((e) => console.error("e", e));
    }
  }

  const absenChangeHandler = (e) => {
    setSelectedAbsen(parseInt(e.target.value));
  }

  const until = "2024-06-23T09:00:00";
  const count = (new Date(until)).getTime();
  
  setInterval(() => {
    const distance = Math.abs(count - (new Date()).getTime());

    document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
  }, 1000);

  const [showT, setShowT] = useState(false);

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setShowT(true);
  }

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    const interval = Math.floor(seconds / 31536000);
    if(interval > 1) {
      return interval + " tahun lalu";
    }

    const month = Math.floor(seconds / 2628000);
    if(month > 1) {
      return month + " bulan lalu";
    }

    const day = Math.floor(seconds / 86400);
    if(day > 1) {
      return day + " hari lalu";
    }

    const hour = Math.floor(seconds / 3600);
    if(hour > 1) {
      return hour + " jam lalu";
    }

    const minute = Math.floor(seconds / 60);
    if(minute > 1) {
      return minute + " menit lalu";
    }

    return "baru saja";
  }

  return (
    <div className='App'>
      <Petals />
      <audio id="play-song" src={song} preload='true' loop />
      
      <main className='container-main' data-bs-spy="scroll" data-bs-target="#navbar-menu" data-bs-smooth-scroll="true">
        <Button id='btn-control-audio' onClick={controlAudio}>
          <img width={16} src={playAudio ? ImgPlay : ImgPause} alt="play" />
        </Button>
        <nav className="navbar burgundy navbar-expand fixed-bottom rounded-top-4 p-0" id="navbar-menu">
          <ul className="navbar-nav nav-justified w-100 align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                <FontAwesomeIcon icon={faHome} color='#EEE' />
                <span className="d-block" style={{color: "#EEE", fontSize: 0.7 + "rem"}}>Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#mempelai">
                <img width={24} src={mempelai} alt="mempelai" />
                <span className="d-block" style={{color: "#EEE", fontSize: 0.7 + "rem"}}>Mempelai</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#countdown">
                <FontAwesomeIcon icon={faCalendarDay} color="#EEE" />
                <span className="d-block" style={{color: "#EEE", fontSize: 0.7 + "rem"}}>Tanggal</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#gift">
                <FontAwesomeIcon icon={faGift} color="#EEE" />
                <span className="d-block" style={{color: "#EEE", fontSize: 0.7 + "rem"}}>Gift</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#ucapan">
                <FontAwesomeIcon icon={faComments} color='#EEE' />
                <span className="d-block" style={{color: "#EEE", fontSize: 0.7 + "rem"}}>Ucapan</span>
              </a>
            </li>
          </ul>
        </nav>
        
        <section className='bg1' id='home'>
          <div className="w-100 text-center pt-4">
            <h1 className="font-esthetic judul1 pb-0" style={{fontSize: "3.2rem", fontWeight: 700, marginTop: 200}}>The Wedding Of</h1>
            <div className="mb-4">
              <div className="img-crop mx-auto foto-home">
                <img className="couple-foto" src={FotoMain} alt="bg" />
              </div>
            </div>

            <div className="title-pengantin">
              <h3 className="font-esthetic p-pria" style={{fontSize: "2.5rem"}}>Al</h3>
              <h3 className="font-esthetic" style={{fontSize: "2.2rem"}}>&amp;</h3>
              <h3 className="font-esthetic p-wanita" style={{fontSize: "2.5rem"}}>Novi</h3>
            </div>
            <div className="mb-0 d-flex align-items-center justify-content-center" id="title-date">
              <p style={{
                borderTop: "2px solid #800020",
                borderBottom: "2px solid #800020",
                minWidth: "80px"
              }}>Minggu</p><br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p style={{
                borderLeft: "2px solid #800020",
                borderRight: "2px solid #800020",
                padding: 10,
              }}>23<br />Juni</p>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <p style={{
                borderTop: "2px solid #800020",
                borderBottom: "2px solid #800020",
                minWidth: "80px"
              }}>&nbsp;&nbsp;2024&nbsp;&nbsp;</p>
            </div>

            <a className="btn btn-sm shadow btn-outline-burgundy rounded-pill px-3 my-2" id="btn-save-the-date" target="_blank" rel='noreferrer' href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MTh0ZGU5ZzVwa28xdnBndTdwMmZxYnNhNnIgZjdiYjBmNmJlYzI5Y2NkNmM2ZDJjYThlOTg2MDhhYjM2NTgwZDRmMDExNmQ1YWVhMGY3ZDY3N2ZlNzQ0YjNmY0Bn&tmsrc=f7bb0f6bec29ccd6c6d2ca8e98608ab36580d4f0116d5aea0f7d677fe744b3fc%40group.calendar.google.com">
              <FontAwesomeIcon icon={faCalendar} />&nbsp;Save The Date
            </a>

            <div className="d-flex justify-content-center align-items-center mt-2 mb-2 mouse-scroll-home">
              <div className="mouse-animation border border-2 border-dark">
                <div className="scroll-animation"></div>
              </div>
            </div>

            <p className="m-0 pb-3 scroll-down">Scroll Down</p>
          </div>
        </section>
        <section className='bg2' id="mempelai">
          <div className='w-100 text-center pt-4' style={{marginBottom: 40}}>
            <img data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" width="70%" src={Bismillah} alt="bismillah"  />

            <h3 data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" style={{fontSize: "1.6rem", marginTop: 25, color: "#800020"}}>Assalamu&apos;alaikum Wr. Wb.</h3>
            <p data-aos="fade-up" data-aos-delay="750" data-aos-duration="1000" style={{padding: "5px 15px"}}>
              Tanpa mengurangi rasa hormat. Kami mengundang Bapak/Ibu/Saudara/i serta Kerabat sekalian untuk menghadiri acara Pernikahan kami:
            </p>
            <div className="position-relative">
              <div className="position-absolute" style={{top: "0%", left: "15%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love-reverse" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                </svg>
              </div>
            </div>
            <div className="layer-sangmempelai">
              <div>
                <img data-aos="fade-left" data-aos-delay="500" data-aos-duration="2000" width={200} height={200} src={MempelaiPria} alt="mempelai Pria" />
                <p data-aos="fade-up" data-aos-delay="750" data-aos-duration="2000">Dika Alfarell Haidir Ramdani</p>
                <div data-aos="fade-up" data-aos-delay="1000" data-aos-duration="2000" style={{color: "#BF9B73", fontSize: "1.2rem"}}>
                  Putra pertama dari <br /><font style={{fontFamily: '"Estonia", Arial, serif', color: "#800020", letterSpacing: 1.2, fontStyle: "normal", fontSize: "2.2rem"}}>Bapak Yul Haidir &amp; Ibu Suparti</font>
                </div>
                <div data-aos="zoom-in" data-aos-delay="1500" data-aos-duration="2000" id="social-media-dika">
                  <ul className="fh5co-social-icons">
                    <li><a target="_blank" rel='noreferrer' href="https://www.instagram.com/al.haidirr"><img width={15} src={IG} alt="instagram" />&nbsp;al.haidirr</a></li>
                  </ul>
                </div>
                <div className="position-relative">
                  <div className="position-absolute" style={{top: "0%", right: "10%"}}>
                    <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                    </svg>
                  </div>
                </div>
                <div data-aos="flip-up" data-aos-delay="1250" data-aos-duration="2000" style={{paddingLeft: 25, paddingRight: 25}}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <img width="100%" src={DividerStyle} alt="divider" />
                        </td>
                        <td><h1 className='my-2' style={{paddingLeft: 20, paddingRight: 20}}>&amp;</h1></td>
                        <td>
                          <img width="100%" src={DividerStyle} alt="divider" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <img data-aos="fade-right" data-aos-delay="500" data-aos-duration="2000" width={200} height={200} src={MempelaiWanita} alt="mempelai Pria" />
                <div className="position-relative">
                  <div className="position-absolute" style={{top: "-15px", left: "10%"}}>
                    <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love-reverse" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                    </svg>
                  </div>
                </div>
                <p data-aos="fade-up" data-aos-delay="500" data-aos-duration="2000">Siti Novi Nurkomala</p>
                <div data-aos="fade-up" data-aos-delay="1000" data-aos-duration="2000" style={{color: "#BF9B73", fontSize: "1.2rem"}}>
                  Putri kedua dari <br /><font style={{fontFamily: '"Estonia", Arial, serif', color: "#800020", letterSpacing: 1.2, fontStyle: "normal", fontSize: "2.2rem"}}>Bapak Taufik Hidayat &amp; Ibu Yoyoh</font>
                </div>
                <div  data-aos="zoom-in" data-aos-delay="1250" data-aos-duration="2000"  id="social-media-novi">
                  <ul className="fh5co-social-icons">
                    <li><a target="_blank" rel='noreferrer' href="https://www.instagram.com/novinurkom"><img width={15} src={IG} alt="instagram" />&nbsp;novinurkom</a></li>
                  </ul>
                </div>
                <div className="position-relative">
                  <div className="position-absolute" style={{top: "0", right: "20%"}}>
                    <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <img width="100%" src={Bunga2} alt="bunga 2" />
            </div>
            <div className='layer-mempelai-bottom d-flex align-items-center justify-content-center'>
              <p data-aos="zoom-in" data-delay="1000" data-aos-duration="1000">
                <br />
                <span className="ayat-title">Allah SWT Berfirman</span><br /><br />
                Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari
                jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu
                rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda
                (kebesaran Allah) bagi kaum yang berpikir.<br /> <br />
                <span className='ayat-endtitle'>QS. Ar-Rum Ayat 21</span>
              </p>
            </div>
            <div className="position-relative">
              <div className="position-absolute" style={{top: "-25px", left: "32%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className="bg2" id="countdown">
          <div className='text-center'>
            <h1 className='font-esthetic'>Our Wedding</h1>
            <h1 data-aos="zoom-in" data-aos-duration="1500">Waktu Menuju Acara</h1>
            <h5 data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1500" className='text-secondary'>23/06/2024</h5>
            <div  data-aos="zoom-in" data-aos-delay="750" data-aos-duration="1500" style={{
              border: "2px solid #BF9B73",
              borderRadius: "75px",
              padding: "10px 0",
              margin: 0,
            }}>
              <table className='table table-borderless p-0 m-0' id="table-countdown">
                <tbody>
                  <tr>
                    <td valign='middle' align='center'>
                      <div className="container-countdown">
                        <span id="day"></span> Hari
                      </div>
                    </td>
                    <td valign='middle' align='center'>
                      <div className="container-countdown">
                        <span id="hour"></span> <br />Jam
                      </div>
                    </td>
                    <td valign='middle' align='center'>
                      <div className="container-countdown">
                        <span id="minute"></span> Menit
                      </div>
                    </td>
                    <td valign='middle' align='center'>
                      <div className="container-countdown">
                        <span id="second"></span> Detik
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p data-aos="fade-down" data-aos-delay="1000" data-aos-duration="1500" className="my-4" style={{paddingLeft: 16, paddingRight: 16}}>
              Dengan memohon rahmat dan ridho Allah Subhanallahu Wa Ta&apos;ala, Insha Allah kami akan menyelenggarakan
              acara :
            </p>
            <div className="position-relative" style={{zIndex: 100}}>
              <div className="position-absolute" style={{top: "0%", right: "16%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                  <path fill="#800020" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                </svg>
              </div>
            </div>
            <Card data-aos="zoom-in" data-aos-delay="1250" data-aos-duration="1000" id='acara-syukuran'>
              <h1 className='font-esthetic'>Tasyakuran Pernikahan</h1>
              <hr />
              <table className='table table-borderless m-0 p-0 w-100' id='table-acara-syukuran'>
                <tbody>
                  <tr className='row'>
                    <td align='center' valign='middle' className='col-6'>
                      <FontAwesomeIcon icon={faClock} /><br />
                      09:00<br />
                      Selesai
                    </td>
                    <td align='center' valign='middle' className='col-6'>
                      <FontAwesomeIcon icon={faCalendar} /><br />
                      Jum&apos;at<br />
                      21 Juni 2024
                    </td>
                  </tr>
                  <tr className='row'>
                    <td colSpan={2} className='col-12'>
                      <h4>Kediaman Mempelai Pria</h4>
                    </td>
                  </tr>
                  <tr className='row'>
                    <td colSpan={2} className='col-12 text-burgundy pt-0 px-4'>
                      Alamat : Kampung Girang, gg. inpress RT 003/008, Kel. Harjasari, Kec. Bogor Selatan, Kota Bogor 16138
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a target='__blank' rel='noreferrer' href="https://maps.app.goo.gl/KyBdmj81xLzKwmHd7"><Button className='rounded-pill btn-burgundy'>Lihat Lokasi&nbsp;<FontAwesomeIcon icon={faMap} /></Button></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <div className="position-relative" style={{zIndex: 100}}>
              <div className="position-absolute" style={{top: "-20px", left: "12%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love-reverse" viewBox="0 0 16 16">
                  <path fill="#800020" fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"></path>
                </svg>
              </div>
            </div>
            <Card data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1500" id='acara-akad'>
              <h1 className='font-esthetic'>Akad</h1>
              <hr />
              <table className='table table-borderless m-0 p-0 w-100' id='table-acara-akad'>
                <tbody>
                  <tr className='row'>
                    <td align='center' valign='middle' className='col-6'>
                      <FontAwesomeIcon icon={faClock} /><br />
                      09:00<br />
                      Selesai
                    </td>
                    <td align='center' valign='middle' className='col-6'>
                      <FontAwesomeIcon icon={faCalendar} /><br />
                      Minggu<br />
                      23 Juni 2024
                    </td>
                  </tr>
                  <tr className='row'>
                    <td colSpan={2} className='col-12'>
                      <h4>Kediaman Mempelai Wanita</h4>
                    </td>
                  </tr>
                  <tr className='row'>
                    <td colSpan={2} className='col-12 text-burgundy pt-0 px-4'>
                      Alamat : Jl. Cikopo Selatan, Kp. Munjul RT 002/005, Kec. Megamendung, Kab. Bogor 16770
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a target='__blank' rel='noreferrer' href='https://maps.app.goo.gl/WDMLtLjNt7rDy2do9'><Button className='rounded-pill btn-burgundy'>Lihat Lokasi&nbsp;<FontAwesomeIcon icon={faMap} /></Button></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <div className="position-relative" style={{zIndex: 100}}>
              <div className="position-absolute" style={{top: "-20px", right: "20%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                  <path fill="#800020" fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"></path>
                </svg>
              </div>
            </div>
            <Card data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1500" id='acara-resepsi'>
              <h1 className='font-esthetic'>Resepsi</h1>
              <hr />
              <table className='table table-borderless m-0 p-0 w-100' id='table-acara-resepsi'>
                <tbody>
                  <tr className='row'>
                    <td align='center' valign='middle' className='col-6'>
                      <FontAwesomeIcon icon={faClock} /><br />
                      10:00<br />
                      Selesai
                    </td>
                    <td align='center' valign='middle' className='col-6'>
                      <FontAwesomeIcon icon={faCalendar} /><br />
                      Minggu<br />
                      23 Juni 2024
                    </td>
                  </tr>
                  <tr className='row'>
                    <td colSpan={2} className='col-12'>
                      <h4>Kediaman Mempelai Wanita</h4>
                    </td>
                  </tr>
                  <tr className='row'>
                    <td colSpan="2" className='col-12 text-burgundy pt-0 px-4'>
                      Alamat : Jl. Cikopo Selatan, Kp. Munjul RT 002/005, Kec. Megamendung, Kab. Bogor 16770
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a target='__blank' rel='noreferrer' href='https://maps.app.goo.gl/WDMLtLjNt7rDy2do9'><Button className='rounded-pill btn-burgundy'>Lihat Lokasi&nbsp;<FontAwesomeIcon icon={faMap} /></Button></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <div className="position-relative" style={{zIndex: 150}}>
              <div className="position-absolute" style={{top: "-50px", left: "12%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                  <path fill="#800020" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                </svg>
              </div>
            </div>
            <div className='my-4'>
              <div style={{paddingLeft: 50, paddingRight: 50, marginTop: 60}}>
                <h1 data-aos="fade-up" data-aos-duration="1000" className='text-secondary'>ADAB WALIMAH</h1>
                <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" className='text-secondary'>Tanpa mengurangi rasa hormat, ada hal-hal dalam adab seorang muslim ketika menghadiri walimah yang harus diperhatikan</p>
              </div>
              <img data-aos="flip-right" data-aos-delay="400" data-aos-duration="2000" className='img-daftar-adab-walimah' width="100%" style={{padding: "8px 24px"}} src={AdabWalimah} alt="adab-walimah" />
              {/* <div data-aos="flip-right" data-aos-delay="400" data-aos-duration="2000" id='adab-walimah'> */}
                {/* <img className='img-daftar-adab-walimah' src={AdabWalimah} alt="adab-walimah" /> */}
              {/* </div> */}
            </div>
          </div>
          <div>

          </div>
        </section>

        <section className='bg2' id='gift'>
          <div data-aos="flip-left" data-aos-delay="500" data-aos-duration="2000" className='text-center' style={{marginTop: 50, marginBottom: 40}}>
            <div className="position-relative">
              <div className="bunga-gift">
                <img style={{width: "100%"}} src={Bunga1} alt="bunga1" />
              </div>
            </div>
            <div className='container-gift'>
              <div className="position-relative">
                <div className="position-absolute" style={{top: "-25px", left: "2%"}}>
                  <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                    <path fill="#EDECF1" fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"></path>
                  </svg>
                </div>
              </div>
              <h3 className='font-esthetic text-secondary'>Wedding Gift</h3>
              <p>Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui fitur di bawah ini:</p>
              <div className='rekening1'>
                <div className='bg-bank-ic d-inline-flex mb-2' style={{padding: "6px 12px"}}>
                  <img src={BCA} alt="bca.png" width={72} />
                </div>
                <br />
                7370269526
                <Button className='btn btn-outline bg-transparent border-0' onClick={() => copyToClipboard("7370269526")}>
                  <FontAwesomeIcon icon={faCopy} />
                </Button><br />
                Yul Haidir
              </div>
              <div className="position-relative">
                <div className="position-absolute" style={{top: "0%", right: "10%"}}>
                  <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love-reverse" viewBox="0 0 16 16">
                    <path fill="#EDECF1" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                  </svg>
                </div>
              </div>
              <div className='rekening2 mt-4'>
              <div className='bg-bank-ic d-inline-flex mb-2' style={{padding: "6px 12px"}}>
                  <img src={Mandiri} alt="bca.png" width="84" />
                </div>
                <br />
                1330015855299
                <Button className='btn btn-outline bg-transparent border-0' onClick={() => copyToClipboard("1330015855299")}>
                  <FontAwesomeIcon icon={faCopy} />
                </Button><br />
                Yul Haidir
              </div>
              <div className='rekening3 mt-4'>
                <div className='bg-bank-ic d-inline-flex mb-2' style={{padding: "6px 12px"}}>
                  <img src={BCA} alt="bca.png" width={72} />
                </div>
                <br />
                7360721269
                <Button className='btn btn-outline bg-transparent border-0' onClick={() => copyToClipboard("7360721269")}>
                  <FontAwesomeIcon icon={faCopy} />
                </Button><br />
                Dika Alfarell Haidir
              </div>
              <div className='kotak-alamat mt-4 mb-0 pb-0'>
                <table>
                  <tbody>
                    <tr>
                      <td rowSpan={2}>
                        <div style={{
                          backgroundColor: "#BF9B73",
                          margin: "10px",
                          border: "1px solid #202020",
                          borderRadius: 50,
                          padding: "15px 10px"
                        }}>
                          <FontAwesomeIcon icon={faGifts} color="#EEE" style={{fontSize: 48}} />
                        </div>
                      </td>
                      <td>Yul Haidir</td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{fontSize: 12}}>Kampung Girang, gg. inpess RT 003/008, Kel. Harjasari, Kec. Bogor Selatan, Kota Bogor 16138</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="position-relative">
                <div className="position-absolute" style={{top: "0%", left: "10%"}}>
                  <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                    <path fill="#EDECF1" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg2" id="ucapan" style={{paddingBottom: 180}}>
          <div data-aos="flip-right" data-aos-delay="500" data-aos-duration="2000" className='text-center'>
            <div className='container-ucapan'>
              <p>{ ucapan != null ? ucapan.data.length + " Comment" : "0 Comment"}</p>
              <hr style={{color: "#EDECF1"}} />
              <h1 className='font-esthetic text-secondary'>Ucapan & do&apos;a</h1>
              <p>Kirimkan Do&apos;a & Ucapan Untuk Kedua Mempelai</p>
              <div className='row'>
                <div className='col-12'>
                  <Form.Control name='nama_tamu' placeholder='Nama' color='#BF9B73' id='txt-nama' className='text-form' required />
                </div>
                <div className='col-12 mt-4'>
                  <Form.Control name='ucapan' as="textarea" rows={3} id="txt-ucapan" placeholder='Berikan Ucapan dan Do&apos;a Restu' required />
                </div>
                <div className='col-12 mt-4'>
                  <Form.Select name='absen' id='txt-absen' onChange={absenChangeHandler} required>
                    <option value="">...</option>
                    <option value="1">Hadir</option>
                    <option value="0">Tidak Hadir</option>
                  </Form.Select>
                </div>
                <div className='col-12 mt-4'>
                  <Button id="btn-beri-ucapan" onClick={kirimUcapan} className='btn btn-burgundy-sec btn-rounded rounded-pill w-100'>Kirim</Button>
                </div>
              </div>
              <div id="container-kumpulan-ucapan" className='mt-4'>
                <table id='table-kumpulan-ucapan' className='w-100'>
                  <tbody>
                    {ucapan != null ? ucapan.data.map((u) => {
                      const badge = u.absen === 1 ? <Badge bg='success' className='pb-0' style={{fontSize: ".75rem"}}>Hadir</Badge> : <Badge bg='danger' className='pb-0' style={{fontSize: ".75rem"}}>Tidak Hadir</Badge>;
                      console.log("da", u.tanggal);
                      const name = u.nama_tamu.split(" ");
                      var avatar = "";
                      if(name.length === 1) {
                        avatar = name[0].substring(0, 1).toUpperCase();
                      } else {
                        avatar = name[0].substring(0, 1).toUpperCase() + name[name.length-1].substring(0,1).toUpperCase();
                      }
                      const bg = colorAvatar[Math.floor(Math.random() * 6)]
                      const colorText = colorAvatar.indexOf(bg) <= 3 ? "#020202" : "#FFF";
                      return (
                        <tr key={u.id}>
                          <td colSpan={2}>
                            <div className='kotak-ucapannya mb-2'>
                              <table style={{width: "100%"}}>
                                <tbody>
                                  <tr>
                                    <td rowSpan={2} valign='top' style={{width: "5%"}}>
                                      <div className='avatar-ucapan' style={{background: bg, color: colorText}}>
                                        {avatar}
                                      </div>
                                    </td>
                                    <td>
                                      <h5 className='mb-0' style={{"color": "#683448"}}>{u.nama_tamu}&nbsp;&nbsp;&nbsp;{badge}</h5>
                                      <div style={{fontSize: ".8rem", color: "#6C6170"}}>
                                        <img src={Clock} alt="pending" width={11} height={11} />
                                        <span>&nbsp;&nbsp;{timeSince(new Date(u.tanggal))}</span>
                                      </div>
                                      <hr className='mb-2 m-0 p-0' />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <p style={{color: "#200220"}}>{u.ucapan}</p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      );
                    }) :
                      <tr>
                        <td colSpan={2}>&nbsp;</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <p style={{marginTop: 30, paddingLeft: 20, paddingRight: 20}}>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila, Bapak/Ibu/Saudara/i berkenan hadir pada hari bahagia ini. terima kasih atas ucapan, do&apos;a dan perhatian yang diberikan</p>
          <p>See you on our big day!</p>
          <h1 className='font-esthetic'>Novi &amp; Dika</h1>
          <h1 style={{fontSize: "1.4rem", color: "#800020", padding: "6px 20px"}}>Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh</h1>
          <div className='position-relative'>
            <div className="bunga-ucapan">
              <img style={{width: "100%"}} src={Bunga2} alt="bunga2" />
            </div>
          </div>
        </section>
      </main>

      <WelcomeModal />
      <ToastContainer position={'top-end'} className='position-fixed'>
        <Toast show={showT} onClose={() => setShowT(false)} delay={3000} autohide className='bg-success m-4' style={{width: 150}}>
          <Toast.Header>
          <img
              src=""
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto"></strong>
            <small></small>
          </Toast.Header>
          <Toast.Body className='text-light'>
            Copied!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;