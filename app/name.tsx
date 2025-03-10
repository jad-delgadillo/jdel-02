import Image from "next/image";

export function NameTransition() {
  return (
    <div>
      <div className="flex flex-col items-start">
        <h1 className="font-medium pt-12 transition-element lee cursor-default ">
          <span className="md:sr-only flex">Jorge Delgadillo</span>
          <span
            aria-hidden="true"
            className="md:block overflow-hidden group relative hidden "
          >
            <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full font-semibold">
              {"Jorge Delgadillo".split("").map((letter, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{ transitionDelay: `${index * 25}ms` }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>
            <span className="inline-block absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0 font-semibold">
              {"@jdel.dev".split("").map((letter, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{ transitionDelay: `${index * 25}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </span>
        </h1>
        {/* <div>
          <Image
            src="/images/profile.jpg"
            alt="Jorge Delgadillo"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div> */}
      </div>
    </div>
  );
}
