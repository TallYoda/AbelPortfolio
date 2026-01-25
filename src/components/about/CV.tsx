import { education, exhibitions, selectedWorks } from '../../data/cv'

export default function CV() {
  return (
    <div className="about-block">
      <h3>CV</h3>
      <div className="cv-group">
        <p className="cv-title">Exhibitions</p>
        <ul>
          {exhibitions.map((item) => (
            <li key={item.text}>
              <span>{item.year}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="cv-group">
        <p className="cv-title">Education</p>
        <ul>
          {education.map((item) => (
            <li key={item.text}>
              <span>{item.year}</span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="cv-group">
        <p className="cv-title">Selected works</p>
        <ul>
          {selectedWorks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

